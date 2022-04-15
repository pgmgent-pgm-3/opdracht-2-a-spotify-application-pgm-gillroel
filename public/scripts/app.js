(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
      this.song();
      this.playlist();
    },

    cacheELements() {
      this.$btnDelete = document.querySelectorAll('.btnDelete--user');
      this.$btnDeletePlaylist = document.querySelectorAll(
        '.btnDelete--playlist'
      );
      this.$btnDeleteSong = document.querySelectorAll('.btnDelete--song');
      this.$btnDeleteAlbum = document.querySelectorAll('.btnDelete--album');
      this.$btnDeleteArtist = document.querySelectorAll('.btnDelete--artist');
      this.$btnUpdateFirstname = document.querySelector('.change-firstname');
      this.$btnUpdateLastname = document.querySelector('.change-lastname');
      this.$btnUpdateUsername = document.querySelector('.change-username');
      this.$btnUpdateEmail = document.querySelector('.change-email');
      this.$btnUpdatePassword = document.querySelector('.change-password');
      this.$btnchangeSong = document.querySelectorAll('.btnchange--song');
      this.$btnchangeArtist = document.querySelectorAll('.btnchange--artist');
    },

    eventListener() {
      // function delete request
      async function deleteRequest(value, id) {
        await fetch(`http://localhost:3000/api/${value}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }).then(() => {
          document.querySelector(`[data-id="${id}"]`).remove();
        });
      }

      // delete users
      this.$btnDelete.forEach(($button) => {
        $button.addEventListener(
          'click',
          (ev) => {
            const id =
              ev.target.dataset.id ||
              ev.target.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.dataset.id ||
              ev.target.parentNode.parentNode.parentNode.dataset.id;

            deleteRequest('user', id);
          },
          false
        );
      });

      // delete playlist
      this.$btnDeletePlaylist.forEach(($button) => {
        $button.addEventListener('click', (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;

          deleteRequest('playlists', id);
        });
      });

      // delete song
      this.$btnDeleteSong.forEach(($button) => {
        $button.addEventListener('click', (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;

          deleteRequest('song', id);
        });
      });

      // delete album
      this.$btnDeleteAlbum.forEach(($button) => {
        $button.addEventListener('click', (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;

          deleteRequest('album', id);
        });
      });

      // delete artist
      this.$btnDeleteArtist.forEach(($button) => {
        $button.addEventListener('click', (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;

          deleteRequest('artist', id);
        });
      });

      // update song
      this.$btnchangeSong.forEach(($button) => {
        $button.addEventListener('click', async (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;

          const update = window.prompt('Pas de song aan:');

          const response = await fetch(`http://localhost:3000/api/song/${id}`);
          const song = await response.json();

          const idNumber = parseInt(id);
          await fetch('http://localhost:3000/api/song', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: idNumber,
              name: update,
              artist: {
                id: song.artist.id,
                name: song.artist.name,
              },
            }),
          }).then(() => location.reload());
        });
      });

      // update artist
      this.$btnchangeArtist.forEach(($button) => {
        $button.addEventListener('click', async (ev) => {
          const id =
            ev.target.dataset.id ||
            ev.target.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.dataset.id ||
            ev.target.parentNode.parentNode.parentNode.dataset.id;
          console.log(id);

          const update = window.prompt('Pas de artist aan:');

          const response = await fetch(
            `http://localhost:3000/api/artist/${id}`
          );
          const artist = await response.json();
          console.log(artist);

          const idNumber = parseInt(id);
          await fetch('http://localhost:3000/api/artist', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: idNumber,
              name: update,
            }),
          }).then(() => location.reload());
        });
      });

      // update firstname
      // this.$btnUpdateFirstname.addEventListener('click', async (ev) => {
      //   const id =
      //     ev.target.dataset.id ||
      //     ev.target.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.parentNode.dataset.id;

      //   const update = window.prompt('Pas je firstname aan:');

      //   const response = await fetch(`http://localhost:3000/api/user/${id}`);
      //   const user = await response.json();

      //   const hashedPassword = bcrypt.hashSync(user.password, 12);
      //   const idNumber = parseInt(id);
      //   await fetch('http://localhost:3000/api/user', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       id: idNumber,
      //       email: user.email,
      //       password: user.password,
      //       userMeta: {
      //         firstname: update,
      //         lastname: user.userMeta.lastname,
      //         username: user.userMeta.username,
      //         avatar: user.userMeta.avatar,
      //       },
      //       role: {
      //         id: user.role.id,
      //         name: user.role.name,
      //       },
      //     }),
      //   }).then(() => location.reload());
      // });

      // this.$btnUpdateLastname.addEventListener('click', async (ev) => {
      //   const id =
      //     ev.target.dataset.id ||
      //     ev.target.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.parentNode.dataset.id;

      //   const update = window.prompt('Pas je lastname aan:');

      //   const response = await fetch(`http://localhost:3000/api/user/${id}`);
      //   const user = await response.json();

      //   const idNumber = parseInt(id);
      //   await fetch('http://localhost:3000/api/user', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       id: idNumber,
      //       email: user.email,
      //       password: user.password,
      //       userMeta: {
      //         firstname: user.userMeta.firstname,
      //         lastname: update,
      //         username: user.userMeta.username,
      //         avatar: user.userMeta.avatar,
      //       },
      //       role: {
      //         id: user.role.id,
      //         name: user.role.name,
      //       },
      //     }),
      //   }).then(() => location.reload());
      // });

      // // update username
      // this.$btnUpdateUsername.addEventListener('click', async (ev) => {
      //   const id =
      //     ev.target.dataset.id ||
      //     ev.target.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.parentNode.dataset.id;

      //   const update = window.prompt('Pas je username aan:');

      //   const response = await fetch(`http://localhost:3000/api/user/${id}`);
      //   const user = await response.json();

      //   const idNumber = parseInt(id);
      //   await fetch('http://localhost:3000/api/user', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       id: idNumber,
      //       email: user.email,
      //       password: user.password,
      //       userMeta: {
      //         firstname: user.userMeta.firstname,
      //         lastname: user.userMeta.lastname,
      //         username: update,
      //         avatar: user.userMeta.avatar,
      //       },
      //       role: {
      //         id: user.role.id,
      //         name: user.role.name,
      //       },
      //     }),
      //   }).then(() => location.reload());
      // });

      // // update email
      // this.$btnUpdateEmail.addEventListener('click', async (ev) => {
      //   const id =
      //     ev.target.dataset.id ||
      //     ev.target.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.parentNode.dataset.id;

      //   const update = window.prompt('Pas je email aan:');

      //   const response = await fetch(`http://localhost:3000/api/user/${id}`);
      //   const user = await response.json();

      //   const idNumber = parseInt(id);
      //   await fetch('http://localhost:3000/api/user', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       id: idNumber,
      //       email: update,
      //       password: user.password,
      //       userMeta: {
      //         firstname: user.userMeta.firstname,
      //         lastname: user.userMeta.lastname,
      //         username: user.userMeta.username,
      //         avatar: user.userMeta.avatar,
      //       },
      //       role: {
      //         id: user.role.id,
      //         name: user.role.name,
      //       },
      //     }),
      //   }).then(() => location.reload());
      // });

      // // update password
      // this.$btnUpdatePassword.addEventListener('click', async (ev) => {
      //   const id =
      //     ev.target.dataset.id ||
      //     ev.target.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.dataset.id ||
      //     ev.target.parentNode.parentNode.parentNode.dataset.id;

      //   const update = window.prompt('Pas je password aan:');

      //   const response = await fetch(`http://localhost:3000/api/user/${id}`);
      //   const user = await response.json();

      //   const idNumber = parseInt(id);
      //   await fetch('http://localhost:3000/api/user', {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       id: idNumber,
      //       email: user.email,
      //       password: update,
      //       userMeta: {
      //         firstname: user.userMeta.firstname,
      //         lastname: user.userMeta.lastname,
      //         username: user.userMeta.username,
      //         avatar: user.userMeta.avatar,
      //       },
      //       role: {
      //         id: user.role.id,
      //         name: user.role.name,
      //       },
      //     }),
      //   }).then(() => location.reload());
      // });
    },

    async song() {
      const params = new URLSearchParams(window.location.search);

      const id = params.get('id');

      const response = await fetch(`http://localhost:3000/api/artist/${id}`);
      const artist = await response.json();

      const $artist = document.querySelector('.artist-container');

      if (artist.album !== 0) {
        this.albumHtml = artist.albums
          .map((a) => `<li>${a.name}</li>`)
          .join('');
      } else {
        this.albumHtml = 'Geen albums';
      }

      if (artist.song !== 0) {
        this.songHtml = artist.song.map((s) => `<li>${s.name}</li>`).join('');
      } else {
        this.songHtml = 'Geen songs';
      }

      $artist.innerHTML = ` <h1>${artist.name}</h1>
      <div class="album-container">
      <h3>Albums</h3>
          <ul>
              ${this.albumHtml}
          </ul>
      </div>
      <div class="song-container">
      <h3>Songs</h3>
      <ul>
          ${this.songHtml}
      </ul>
      </div>
      `;
    },

    async playlist() {
      const params = new URLSearchParams(window.location.search);

      const id = params.get('id');
      console.log(id);

      const response = await fetch(`http://localhost:3000/api/playlists/${id}`);
      const playlist = await response.json();

      const $playlist = document.querySelector('.playlist-container');

      if (playlist.songs !== 0) {
        this.songsHtml = playlist.songs
          .map((s) => `<li>${s.name}</li>`)
          .join('');
      } else {
        this.songHtml = 'Geen songs';
      }

      $playlist.innerHTML = `
      <h1>${playlist.name}</h1>

      <div class="song-container">
      <ul>
      ${this.songsHtml}
      </ul>
      </div>   
      `;
    },
  };

  app.initialize();
})();
