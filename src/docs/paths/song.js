import songResponse from '../responses/song.js';

export default {
  '/api/songs': {
    summary: 'Gets all the songs',
    description: 'Gets all the songs in database',
    get: {
      tags: ['Song'],
      responses: songResponse,
    },
  },

  '/api/song': {
    summary: 'create a new song',
    description: 'create a new song...',
    post: {
      tags: ['Song'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SongInput',
            },
          },
        },
      },
      responses: songResponse,
    },
    put: {
      tags: ['Song'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/SongInput',
            },
          },
        },
      },
      responses: songResponse,
    },
  },

  '/api/song/{id}': {
    summary: 'Gets a existing song',
    description: 'Gets an existing song in database...',
    get: {
      tags: ['Song'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The song id',
        },
      ],
      responses: songResponse,
    },
    delete: {
      tags: ['Song'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The Song id',
        },
      ],
      responses: songResponse,
    },
  },
};
