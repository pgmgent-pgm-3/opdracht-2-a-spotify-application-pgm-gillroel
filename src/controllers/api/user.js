import { getConnection } from 'typeorm';

export const getUser = async (req, res, next) => {
  try {
    const userRepository = getConnection().getRepository('User');
    res
      .status(200)
      .json(
        await userRepository.find({ relations: ['user_meta_id', 'role_id'] })
      );
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
        relations: ['user_meta_id', 'role_id'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

// export const postUser = async (req, res, next) => {
//   try {
//     // validate incoming body
//     if (!req.body.email) throw new Error('please provide a name for user');

//     const userRepository = getConnection().getRepository('User');

//     const user = await userRepository.findOne({
//       where: { email: req.body.email },
//     });

//     if (user) {
//       res.status(200).json({ status: `Posted user with id: ${user.id}` });
//       return;
//     }

//     const insertedUser = await userRepository.save(req.body);

//     res.status(200).json({ status: `Posted user with id: ${insertedUser.id}` });
//   } catch (e) {
//     next(e.message);
//   }
// };
