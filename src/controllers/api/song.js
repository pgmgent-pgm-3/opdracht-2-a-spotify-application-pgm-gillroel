import { getConnection } from 'typeorm';

export const getSong = async (req, res, next) => {
  try {
    // get song repo
    const songRepository = getConnection().getRepository('Song');

    const { relations } = songRepository.metadata;
    const relationnames = relations.map((m) => m.propertyName);
    console.log(relationnames);
    res.status(200).json(await songRepository.find({ relations: relationnames }));
  } catch (e) {
    next(e.message);
  }
};

export const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // kijken of er een id is meegegeven
    if (!id) throw new Error('please specify a id to remove');

    // get song repo
    const songRepository = getConnection().getRepository('Song');

    res.status(200).json(
      await songRepository.findOne({
        where: { id },
        relations: ['artist'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const postSong = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('please provide a name for song');

    // get the song repo
    const songRepository = getConnection().getRepository('Song');

    // kijken of de song nog niet bestaat
    const song = await songRepository.findOne({
      where: { name: req.body.name },
    });

    // als de song bestaat niks doen
    if (song) {
      res.status(200).json({ status: `Posted song with id: ${song.id}` });
      return;
    }

    // song toevoegen aan de databank
    const insertedSong = await songRepository.save(req.body);

    // boodschap terug geven
    res.status(200).json({ status: `Posted song with id: ${insertedSong.id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateSong = async (req, res, next) => {
  try {
    // validate incoming id
    if (!req.body.id)
      throw new Error('Please provide an id for the song you want to update');

    // get artist repo
    const songRepository = getConnection().getRepository('Song');

    // vind de artiest met de juiste id
    const song = await songRepository.findOne({
      where: { id: req.body.id },
    });

    // de gegeven song bestaat niet
    if (!song) throw new Error('the given song does not exist');

    const updatedSong = { ...song, ...req.body };

    // de song bewaren in de databank
    await songRepository.save(updatedSong);

    res.status(200).json({ status: `Update song with id: ${req.body.id}.` });
  } catch (e) {
    next(e.message);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('please specify an id to remove');

    // song repo ophalen
    const songRepository = getConnection().getRepository('Song');

    // juiste song zoeken
    const song = await songRepository.findOne({ id });

    // als de song niet bestaat een error geven
    if (!song) throw new Error(`The song with id ${id} does not exist`);

    // de artiest verwijderen
    await songRepository.remove({ id });

    res.status(200).json({ status: `delete song with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};
