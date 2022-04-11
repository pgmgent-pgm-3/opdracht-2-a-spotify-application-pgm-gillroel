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
    console.log(id);
    console.log(req.params);

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
    if (!req.body.email) throw new Error('please provide a email for user');

    const userRepository = getConnection().getRepository('User');

    console.log(req.body.email);
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });
    console.log(user);

    if (user) {
      res.status(200).json({ status: `Posted user with id: ${user.id}` });
      return;
    }
    console.log(req.body);

    const insertedUser = await userRepository.save(req.body);

    res.status(200).json({ status: `Posted user with id: ${insertedUser.id}` });
  } catch (e) {
    return next(e.message);
  }
};
