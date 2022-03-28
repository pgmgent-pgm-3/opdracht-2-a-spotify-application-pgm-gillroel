import { getConnection } from 'typeorm';

export const getAlbum = async (req, res, next) => {
  try {
    // get album repo
    const albumRepository = getConnection().getRepository('Album');

    res
      .status(200)
      .json(await albumRepository.find({ relations: ['artist_id'] }));
  } catch (e) {
    next(e.message);
  }
};

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // kijken of er een id is meegegeven
    if (!id) throw new Error('please specify a id to remove');

    // get album repo
    const albumRepository = getConnection().getRepository('Album');

    res.status(200).json(
      await albumRepository.findOne({
        where: { id },
        relations: ['artist_id'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const postAlbum = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('please provide a name for song');

    // get the album repo
    const albumRepository = getConnection().getRepository('Album');

    // kijken of de album nog niet bestaat
    const album = await albumRepository.findOne({
      where: { name: req.body.name },
    });

    // als de album bestaat niks doen
    if (album) {
      res.status(200).json({ status: `Posted song with id: ${album.id}` });
      return;
    }

    // album toevoegen aan de databank
    const insertedAlbum = await albumRepository.save(req.body);

    // boodschap terug geven
    res
      .status(200)
      .json({ status: `Posted album with id: ${insertedAlbum.id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updateAlbum = async (req, res, next) => {
  try {
    // validate incoming id
    if (!req.body.id)
      throw new Error('Please provide an id for the album you want to update');

    // get album repo
    const albumRepository = getConnection().getRepository('Album');

    // vind het album met de juiste id
    const album = await albumRepository.findOne({
      where: { id: req.body.id },
    });

    // de gegeven album bestaat niet
    if (!album) throw new Error('the given song does not exist');

    const updatedAlbum = { ...album, ...req.body };

    // de song bewaren in de databank
    await albumRepository.save(updatedAlbum);

    res.status(200).json({ status: `Update album with id: ${req.body.id}.` });
  } catch (e) {
    next(e.message);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('please specify an id to remove');

    // album repo ophalen
    const albumRepository = getConnection().getRepository('Album');

    // juiste album zoeken
    const album = await albumRepository.findOne({ id });

    // als de album niet bestaat een error geven
    if (!album) throw new Error(`The album with id ${id} does not exist`);

    // het album verwijderen
    await albumRepository.remove({ id });

    res.status(200).json({ status: `delete album with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};
