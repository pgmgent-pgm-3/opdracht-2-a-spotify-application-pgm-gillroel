(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },

    cacheELements() {
      this.$btnUpdateFirstname = document.querySelector('.change-firstname');
      this.$btnUpdateLastname = document.querySelector('.change-lastname');
      this.$btnUpdateUsername = document.querySelector('.change-username');
      this.$btnUpdateEmail = document.querySelector('.change-email');
      this.$btnUpdatePassword = document.querySelector('.change-password');
    },

    eventListener() {
      // update firstname
      this.$btnUpdateFirstname.addEventListener('click', async (ev) => {
        const id =
          ev.target.dataset.id ||
          ev.target.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.parentNode.dataset.id;

        const update = window.prompt('Pas je firstname aan:');

        const response = await fetch(`http://localhost:3000/api/user/${id}`);
        const user = await response.json();

        const hashedPassword = bcrypt.hashSync(user.password, 12);
        const idNumber = parseInt(id);
        await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idNumber,
            email: user.email,
            password: user.password,
            userMeta: {
              firstname: update,
              lastname: user.userMeta.lastname,
              username: user.userMeta.username,
              avatar: user.userMeta.avatar,
            },
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          }),
        }).then(() => location.reload());
      });

      // update lastname
      this.$btnUpdateLastname.addEventListener('click', async (ev) => {
        const id =
          ev.target.dataset.id ||
          ev.target.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.parentNode.dataset.id;

        const update = window.prompt('Pas je lastname aan:');

        const response = await fetch(`http://localhost:3000/api/user/${id}`);
        const user = await response.json();

        const idNumber = parseInt(id);
        await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idNumber,
            email: user.email,
            password: user.password,
            userMeta: {
              firstname: user.userMeta.firstname,
              lastname: update,
              username: user.userMeta.username,
              avatar: user.userMeta.avatar,
            },
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          }),
        }).then(() => location.reload());
      });

      // update username
      this.$btnUpdateUsername.addEventListener('click', async (ev) => {
        const id =
          ev.target.dataset.id ||
          ev.target.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.parentNode.dataset.id;

        const update = window.prompt('Pas je username aan:');

        const response = await fetch(`http://localhost:3000/api/user/${id}`);
        const user = await response.json();

        const idNumber = parseInt(id);
        await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idNumber,
            email: user.email,
            password: user.password,
            userMeta: {
              firstname: user.userMeta.firstname,
              lastname: user.userMeta.lastname,
              username: update,
              avatar: user.userMeta.avatar,
            },
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          }),
        }).then(() => location.reload());
      });

      // update email
      this.$btnUpdateEmail.addEventListener('click', async (ev) => {
        const id =
          ev.target.dataset.id ||
          ev.target.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.parentNode.dataset.id;

        const update = window.prompt('Pas je email aan:');

        const response = await fetch(`http://localhost:3000/api/user/${id}`);
        const user = await response.json();

        const idNumber = parseInt(id);
        await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idNumber,
            email: update,
            password: user.password,
            userMeta: {
              firstname: user.userMeta.firstname,
              lastname: user.userMeta.lastname,
              username: user.userMeta.username,
              avatar: user.userMeta.avatar,
            },
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          }),
        }).then(() => location.reload());
      });

      // update password
      this.$btnUpdatePassword.addEventListener('click', async (ev) => {
        const id =
          ev.target.dataset.id ||
          ev.target.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.dataset.id ||
          ev.target.parentNode.parentNode.parentNode.dataset.id;

        const update = window.prompt('Pas je password aan:');

        const response = await fetch(`http://localhost:3000/api/user/${id}`);
        const user = await response.json();

        const idNumber = parseInt(id);
        await fetch('http://localhost:3000/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: idNumber,
            email: user.email,
            password: update,
            userMeta: {
              firstname: user.userMeta.firstname,
              lastname: user.userMeta.lastname,
              username: user.userMeta.username,
              avatar: user.userMeta.avatar,
            },
            role: {
              id: user.role.id,
              name: user.role.name,
            },
          }),
        }).then(() => location.reload());
      });
    },
  };

  app.initialize();
})();
