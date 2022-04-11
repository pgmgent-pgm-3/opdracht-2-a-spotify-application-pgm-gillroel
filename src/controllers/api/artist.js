import { getConnection } from 'typeorm';

export const getArtist = async (req, res, next) => {
  try {
    // get artist repo
    const artistRepository = getConnection().getRepository('Artist');

    res
      .status(200)
      .json(await artistRepository.find({ relations: ['albums'] }));
  } catch (e) {
    next(e.message);
  }
};

export const getArtistById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // kijken of er een id is meegegeven
    if (!id) throw new Error('please specify a id to remove');

    // get album repo
    const artistRepository = getConnection().getRepository('Artist');

    res.status(200).json(
      await artistRepository.findOne({
        where: { id },
        relations: ['albums'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const postArtist = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('please provide a name for user');

    // get the artist repo
    const artistRepository = getConnection().getRepository('Artist');

    // kijken of de artiest nog niet bestaat
    const artist = await artistRepository.findOne({
      where: { name: req.body.name },
    });

    // als de artiest bestaat niks doen
    if (artist) {
      res.status(200).json({ status: `Posted artist with id: ${artist.id}` });
      return;
    }

    // artist toevoegen aan de databank
    const insertedArtist = await artistRepository.save(req.body);

    // boodschap terug geven
    res
      .status(200)
      .json({ status: `Posted user with id: ${insertedArtist.id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateArtist = async (req, res, next) => {
  try {
    // validate incoming id
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the category you want to update'
      );

    // get artist repo
    const artistRepository = getConnection().getRepository('Artist');

    // vind de artiest met de juiste id
    const artist = await artistRepository.findOne({
      where: { id: req.body.id },
    });

    // de gegeven artist bestaat niet
    if (!artist) throw new Error('the given artist does not exist');

    const updatedArtist = { ...artist, ...req.body };

    // de artiest bewaren in de databank
    await artistRepository.save(updatedArtist);

    res.status(200).json({ status: `Update artist with id: ${req.body.id}.` });
  } catch (e) {
    next(e.message);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('please specify an id to remove');

    // artiesten repo ophalen
    const artistRepository = getConnection().getRepository('Artist');

    // juiste artiest zoeken
    const artist = await artistRepository.findOne({ id });

    // als de artiest niet bestaat een error geven
    if (!artist) throw new Error(`The category with id ${id} does not exist`);

    // de artiest verwijderen
    await artistRepository.remove({ id });

    res.status(200).json({ status: `delete category with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};
