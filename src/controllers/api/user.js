import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';

export const getUser = async (req, res, next) => {
  try {
    const userRepository = getConnection().getRepository('User');
    res
      .status(200)
      .json(await userRepository.find({ relations: ['userMeta', 'role'] }));
  } catch (e) {
    next(e.message);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // kijken of er een id is meegegeven
    if (!id) throw new Error('please specify a id to remove');

    // get user repo
    const userRepository = getConnection().getRepository('User');

    res.status(200).json(
      await userRepository.findOne({
        where: { id },
        relations: ['userMeta', 'role'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const postUser = async (req, res, next) => {
  try {
    if (!req.body.email) throw new Error('please provide a name for user');

    const userRepository = getConnection().getRepository('User');

    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      res.status(200).json({ status: `Posted user with id: ${user.id}` });
      return;
    }

    // hash te password
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    const insertedUser = await userRepository.save({
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

    res.status(200).json({ status: `Posted user with id: ${insertedUser.id}` });
  } catch (e) {
    return next(e.message);
  }
};
