import { getConnection } from 'typeorm';

export const home = async (req, res) => {
  const playListRepository = getConnection().getRepository('Playlist');
  const playList = await playListRepository.find({
    relations: ['songs'],
  });

  const userRepository = getConnection().getRepository('User');
  const user = await userRepository.find({
    where: { id: req.user.id },
    relations: ['playlist'],
  });

  const artistRepository = getConnection().getRepository('Artist');
  const artist = await artistRepository.find({
    relations: ['albums', 'song'],
  });
  console.log(artist);

  const songRepository = getConnection().getRepository('Song');
  const songs = await songRepository.find({ relations: ['artist'] });

  res.render('home', {
    playList,
    artist,
    songs,
    user: req.user,
  });
};
