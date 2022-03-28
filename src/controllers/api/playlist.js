import { getConnection } from 'typeorm';

export const getPlaylist = async (req, res, next) => {
  try {
    // get playlist repo
    const playlistRepository = getConnection().getRepository('Playlist');

    res
      .status(200)
      .json(await playlistRepository.find({ relations: ['user_id', 'songs'] }));
  } catch (e) {
    next(e.message);
  }
};

export const getPlaylistById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // kijken of er een id is meegegeven
    if (!id) throw new Error('please specify a id to remove');

    // get playlist repo
    const playlistRepository = getConnection().getRepository('Playlist');

    res.status(200).json(
      await playlistRepository.findOne({
        where: { id },
        relations: ['user_id', 'songs'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const postPlaylist = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.name) throw new Error('please provide a name for song');

    // get the playlist repo
    const playlistRepository = getConnection().getRepository('Playlist');

    // kijken of de album nog niet bestaat
    const playlist = await playlistRepository.findOne({
      where: { name: req.body.name },
    });

    // als de playlist bestaat niks doen
    if (playlist) {
      res.status(200).json({ status: `Posted song with id: ${playlist.id}` });
      return;
    }

    // album toevoegen aan de databank
    const insertedPlaylist = await playlistRepository.save(req.body);

    // boodschap terug geven
    res
      .status(200)
      .json({ status: `Posted album with id: ${insertedPlaylist.id}` });
  } catch (e) {
    next(e.message);
  }
};

export const updatePlaylist = async (req, res, next) => {
  try {
    // validate incoming id
    if (!req.body.id)
      throw new Error(
        'Please provide an id for the playlist you want to update'
      );

    // get playlist repo
    const playlistRepository = getConnection().getRepository('Playlist');

    // vind het playlist met de juiste id
    const playlist = await playlistRepository.findOne({
      where: { id: req.body.id },
    });

    // de gegeven playlist bestaat niet
    if (!playlist) throw new Error('the given playlist does not exist');

    const updatedPlaylist = { ...playlist, ...req.body };

    // de song bewaren in de databank
    await playlistRepository.save(updatedPlaylist);

    res
      .status(200)
      .json({ status: `Update playlist with id: ${req.body.id}.` });
  } catch (e) {
    next(e.message);
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error('please specify an id to remove');

    // playlist repo ophalen
    const playlistRepository = getConnection().getRepository('Album');

    // juiste playlist zoeken
    const playlist = await playlistRepository.findOne({ id });

    // als de playlist niet bestaat een error geven
    if (!playlist) throw new Error(`The playlist with id ${id} does not exist`);

    // het album verwijderen
    await playlistRepository.remove({ id });

    res.status(200).json({ status: `delete playlist with id ${id}` });
  } catch (e) {
    next(e.message);
  }
};
