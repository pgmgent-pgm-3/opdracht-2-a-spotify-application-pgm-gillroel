import { getConnection } from 'typeorm';

export const home = async (req, res) => {
  const playList = [
    {
      name: 'party',
    },
    {
      name: 'hardstyle',
    },
  ];

  res.render('home', {
    playList,
  });
};
