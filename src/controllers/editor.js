import { getConnection } from 'typeorm';

export const editor = async (req, res) => {
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

  res.render('editor', {
    album,
    artist,
    song,
    playList,
    users,
    user: req.user,
  });
};