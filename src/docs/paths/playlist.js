import playlistResponse from '../responses/playlist.js';

export default {
  // '/api/playlists': {
  //   summary: 'Gets all the playlist',
  //   description: 'Gets all the playlists in database...',
  //   get: {
  //     tags: ['Playlist'],
  //     responses: playlistResponse,
  //   },
  // },

  '/api/playlists/{id}': {
    summary: 'Gets a existing playlist',
    description: 'Gets an existing playlist in database...',
    get: {
      tags: ['Playlist'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The playlist id',
        },
      ],
      responses: playlistResponse,
    },
    delete: {
      tags: ['Playlist'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The playlist id',
        },
      ],
      responses: playlistResponse,
    },
  },

  '/api/playlist': {
    summary: 'Gets a existing playlist',
    description: 'Gets an existing playlist in database...',
    get: {
      tags: ['Playlist'],
      responses: playlistResponse,
    },
    post: {
      tags: ['Playlist'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlaylistInput',
            },
          },
        },
      },
      responses: playlistResponse,
    },
  },

  '/api/playlists': {
    summary: 'create a new playlist',
    description: 'create a new playlist...',
    put: {
      tags: ['Playlist'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlaylistInput',
            },
          },
        },
      },
      responses: playlistResponse,
    },
  },
};
