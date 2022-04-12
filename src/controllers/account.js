export const account = async (req, res) => {
  const playList = [
    {
      name: 'party',
    },
    {
      name: 'hardstyle',
    },
  ];

  const inputs = [
    {
      name: 'firstName',
      label: 'FirstName',
      type: 'text',
      value: req.body?.firstName ? req.body.firstName : '',
      error: req.formErrorsFields?.firstName
        ? req.formErrorsFields.firstName
        : '',
    },
    {
      name: 'lastName',
      label: 'LastName',
      type: 'text',
      value: req.body?.lastName ? req.body.lastName : '',
      error: req.formErrorsFields?.lastName
        ? req.formErrorsFields.lastName
        : '',
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'text',
      value: req.body?.email ? req.body.email : '',
      error: req.formErrorsFields?.email ? req.formErrorsFields.email : '',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      value: req.body?.username ? req.body.username : '',
      error: req.formErrorsFields?.username
        ? req.formErrorsFields.username
        : '',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      value: req.body?.password ? req.body.password : '',
      error: req.formErrorsFields?.password
        ? req.formErrorsFields.password
        : '',
    },
  ];

  res.render('account', {
    playList,
    inputs,
    user: req.user,
  });
};
