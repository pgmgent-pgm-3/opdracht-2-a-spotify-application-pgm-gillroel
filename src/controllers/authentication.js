import { validationResult } from 'express-validator';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  const inputs = [
    {
      name: 'firstName',
      label: 'FirstName',
      type: 'text',
      value: req.body?.firstName ? req.body.firstName : '',
      error: req.formErrorsFields?.firstName
        ? req.formErrorsFields.firstName
        : '',
    },
    {
      name: 'lastName',
      label: 'LastName',
      type: 'text',
      value: req.body?.lastName ? req.body.lastName : '',
      error: req.formErrorsFields?.lastName
        ? req.formErrorsFields.lastName
        : '',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorsFields?.email ? req.formErrorsFields.email : '',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: req.body?.username ? req.body.username : '',
      error: req.formErrorsFields?.username
        ? req.formErrorsFields.username
        : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorsFields?.password
        ? req.formErrorsFields.password
        : '',
    },
  ];

  const roleRepository = getConnection().getRepository('Role');
  const role = await roleRepository.find();

  // render the register page
  res.render('register', {
    layout: 'authentication',
    inputs,
    formErrors,
    role,
  });
};

export const login = async (req, res) => {
  //  if there is a user, redirect to the root url
  if (req.cookies.token) {
    res.redirect('/');
    return;
  }

  // errors
  const formErrors = req.formErrors ? req.formErrors : [];

  // input fields
  const inputs = [
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorsFields?.email ? req.formErrorsFields.email : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorsFields?.password
        ? req.formErrorsFields.password
        : '',
    },
  ];

  // render the login page
  res.render('login', {
    layout: 'authentication',
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorsFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorsFields[param] = msg;
      });
      return next();
    }
    const userRepository = getConnection().getRepository('User');

    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      req.formErrors = [{ message: 'Gebruiker bestaat reeds.' }];
      return next();
    }



    // hash te password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    await userRepository.save({
      email: req.body.email,
      password: hashedPassword,
      userMeta: {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        username: req.body.username,
        avatar: req.body.avatar,
      },
      role: {
        id: req.body.role,
      },
    });

    // go to login page
    res.redirect('/login');
  } catch (e) {
    return next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.formErrorsFields = {};

      errors.array().forEach(({ msg, param }) => {
        req.formErrorsFields[param] = msg;
      });
      return next();
    }
    const userRepository = getConnection().getRepository('User');

    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      req.formErrors = [{ message: 'Gebruiker is onbekend.' }];
      return next();
    }

    // check if incoming password is equal with the one in our database
    const isEqual = bcrypt.compareSync(req.body.password, user.password);

    if (!isEqual) {
      req.formErrors = [{ message: 'Wachtwoord is onjuist' }];
      return next();
    }

    // create a token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TOKEN_SALT,
      { expiresIn: '1h' }
    );

    // add the cookie in response
    res.cookie('token', token, { httpOnly: true });

    // redirect to the home page
    res.redirect('/');
  } catch (e) {
    return next(e.message);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie('token');
    return res.redirect('/login');
  } catch (e) {
    return next(e.message);
  }
};
