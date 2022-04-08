export const home = async (req, res) => {
  const playList = [
    {
      name: 'party',
    },
    {
      name: 'hardstyle',
    },
  ];

  console.log(req.user);
  

  res.render('home', {
    playList,
    user: req.user,
  });
};
