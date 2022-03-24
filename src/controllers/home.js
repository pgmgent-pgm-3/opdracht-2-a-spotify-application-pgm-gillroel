export const home = (req, res) => {
  const playList = [
    {
      name: 'party',
    },
    {
      name: 'hardstyle',
    },
  ];

  const task = [
    {
      task: 'Working for programming 3',
    },
    {
      task: 'Chatting with other students',
    },
  ];

  const taskDone = [
    {
      task: 'Doing some homework',
    },
  ];

  res.render('home', {
    playList,
    task,
    taskDone,
  });
};
