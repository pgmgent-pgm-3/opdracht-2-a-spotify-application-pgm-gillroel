import { getConnection } from 'typeorm';

export const getRole = async (req, res, next) => {
  try {
    // get role repo
    const roleRepository = getConnection().getRepository('Role');

    res.status(200).json(await roleRepository.find());
  } catch (e) {
    next(e.message);
  }
};

export const postRole = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('please provide a name for role');

    // get the role repo
    const roleRepository = getConnection().getRepository('Role');

    // kijken of de role nog niet bestaat
    const role = await roleRepository.findOne({
      where: { name: req.body.name },
    });

    // als de role bestaat niks doen
    if (role) {
      res.status(200).json({ status: `Posted role with id: ${role.id}` });
      return;
    }

    // role toevoegen aan de databank
    const insertedRole = await roleRepository.save(req.body);

    // boodschap terug geven
    res.status(200).json({ status: `Posted role with id: ${insertedRole.id}` });
  } catch (e) {
    next(e.message);
  }
};
