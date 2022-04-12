(() => {
  const app = {
    initialize() {
      this.cacheELements();
      this.eventListener();
    },

    cacheELements() {
      this.$btnDelete = document.querySelectorAll('.btnDelete--user');
      this.$btnDeletePlaylist = document.querySelectorAll(
        '.btnDelete--playlist'
      );
      this.$btnDeleteSong = document.querySelectorAll('.btnDelete--song');
      this.$btnDeleteAlbum = document.querySelectorAll('.btnDelete--album');
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
    },
  };

  app.initialize();
})();
