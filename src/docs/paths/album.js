import albumResponse from '../responses/album.js';

export default {
  '/api/albums': {
    summary: 'Gets all the albums',
    description: 'Gets all the albums in database...',
    get: {
      tags: ['Album'],
      responses: albumResponse,
    },
  },

  '/api/album/{id}': {
    summary: 'Gets a existing Album',
    description: 'Gets an existing albums in database...',
    get: {
      tags: ['Album'],
    },
    delete: {
      tags: ['Album'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The album id',
        },
      ],
      responses: albumResponse,
    },
  },

  '/api/album': {
    summary: 'create a new album',
    description: 'create a new album...',
    post: {
      tags: ['Album'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AlbumInput',
            },
          },
        },
      },
      responses: albumResponse,
    },
    put: {
      tags: ['Album'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/AlbumInput',
            },
          },
        },
      },
      responses: albumResponse,
    },
  },
};
