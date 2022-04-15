import { getConnection } from 'typeorm';

export const playlist = async (req, res) => {
  const playListRepository = getConnection().getRepository('Playlist');
  const playList = await playListRepository.find({
    relations: ['songs'],
  });
  res.render('playlist', {
    playList,
    user: req.user,
  });
};
