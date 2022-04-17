import { getConnection } from 'typeorm';

export const admin = async (req, res) => {
  const userRepository = getConnection().getRepository('User');
  const users = await userRepository.find({
    relations: ['userMeta', 'role', 'playlist'],
  });

  const playListRepository = getConnection().getRepository('Playlist');
  const playList = await playListRepository.find({
    relations: ['songs'],
  });

  const songRepository = getConnection().getRepository('Song');
  const song = await songRepository.find({ relations: ['artist'] });

  const albumRepository = getConnection().getRepository('Album');
  const album = await albumRepository.find({ relations: ['artist'] });

  const artistRepository = getConnection().getRepository('Artist');
  const artist = await artistRepository.find({ relations: ['song'] });

  res.render('admin', {
    album,
    artist,
    song,
    playList,
    users,
    user: req.user,
  });
};

export const addPlaylist = async (req, res, next) => {
  try {
    if (!req.body.playlist)
      throw new Error('please provide a name for a playlist');

    // get playlist repo
    const playListRepository = getConnection().getRepository('Playlist');
    // get the user repo
    const userRepository = getConnection().getRepository('User');
    const user = await userRepository.findOne({
      where: { id: req.body.user },
      relations: ['userMeta'],
    });

    // get the song repo
    const songRepository = getConnection().getRepository('Song');
    const song = await songRepository.find({ where: { name: req.body.song } });

    // kijken of de playlist al bestaat
    let playlist = await playListRepository.findOne({
      where: { name: req.body.playlist },
      relations: ['songs'],
    });

    // bestaat niet
    if (!playlist) {
      playlist = await playListRepository.save({
        name: req.body.playlist,
        user: [user],
      });
    }
    res.redirect('/admin');
  } catch (error) {
    next(error.message);
  }
};

export const addSong = async (req, res, next) => {
  try {
    // kijken of er een song is ingegeven
    if (!req.body.song) throw new Error('please provide a song');

    // get the song repo
    const songRepository = getConnection().getRepository('Song');

    // get the artist repo
    const artistRepository = getConnection().getRepository('Artist');
    const artist = await artistRepository.findOne({
      where: { name: req.body.artist },
    });

    // kijken of de song nog niet bestaat
    let song = await songRepository.findOne({
      where: { name: req.body.song },
      relations: ['artist'],
    });

    // song toevoegen aan song repo
    if (!song) {
      song = await songRepository.save({
        name: req.body.song,
        artist,
      });
    }

    res.redirect('/admin');
  } catch (error) {
    next(error.message);
  }
};

export const addArtist = async (req, res, next) => {
  try {
    // kijken of er een artist is ingegeven
    if (!req.body.artist) throw new Error('please provide a artist');

    // get the song repo
    const artistRepository = getConnection().getRepository('Artist');

    // kijken of de song nog niet bestaat
    let artist = await artistRepository.findOne({
      where: { name: req.body.artist },
    });

    // song toevoegen aan song repo
    if (!artist) {
      artist = await artistRepository.save({
        name: req.body.artist,
      });
    }

    res.redirect('/admin');
  } catch (error) {
    next(error.message);
  }
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    if (!req.body.playlist) throw new Error('please provide a playlist');
    if (!req.body.song) throw new Error('please provide a song');

    const playlistRepository = getConnection().getRepository('Playlist');
    const playlist = await playlistRepository.findOne({
      where: { id: req.body.playlist },
      relations: ['songs'],
    });

    const songRepository = getConnection().getRepository('Song');
    const song = await songRepository.findOne({
      where: { id: req.body.song },
    });

    playlist.songs.push(song);

    await playlistRepository.save(playlist);

    res.redirect('/admin');
  } catch (error) {
    next(error.message);
  }
};

export const addAlbum = async (req, res, next) => {
  try {
    // kijken of er een album is gegeven
    if (!req.body.album) throw new Error('please provide a album');

    // get the album repo
    const albumRepository = getConnection().getRepository('Album');

    // get the artist repo
    const artistRepository = getConnection().getRepository('Artist');
    const artist = await artistRepository.findOne({
      where: { name: req.body.artist },
    });

    // kijken of het album nog niet bestaat
    let album = await albumRepository.findOne({
      where: { name: req.body.album },
      relations: ['artist'],
    });

    if (!album) {
      album = await albumRepository.save({
        name: req.body.album,
        artist,
      });
    }

    res.redirect('/admin');
  } catch (error) {
    next(error.message);
  }
};
