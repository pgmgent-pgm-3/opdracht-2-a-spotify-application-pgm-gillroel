import { getConnection } from 'typeorm';

export const artist = async (req, res) => {
  const playListRepository = getConnection().getRepository('Playlist');
  const playList = await playListRepository.find({
    relations: ['songs'],
  });
  res.render('artist', {
    playList,
    user: req.user,
  });
};
