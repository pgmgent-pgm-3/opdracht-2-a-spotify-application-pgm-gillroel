import { getConnection } from 'typeorm';

export const admin = async (req, res) => {
  // const playList = [
  //   {
  //     name: 'party',
  //   },
  //   {
  //     name: 'hardstyle',
  //   },
  // ];

  const userRepository = getConnection().getRepository('User');
  const users = await userRepository.find({ relations: ['userMeta', 'role'] });

  const playListRepository = getConnection().getRepository('Playlist');
  const playList = await playListRepository.find({
    relations: ['user', 'songs'],
  });

  const songRepository = getConnection().getRepository('Song');
  const song = await songRepository.find({ relations: ['artist'] });

  const albumRepository = getConnection().getRepository('Album');
  const album = await albumRepository.find({ relations: ['artist'] });

  console.log(album);
  res.render('admin', {
    album,
    song,
    playList,
    users,
    user: req.user,
  });
};
