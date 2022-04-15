import artistResponse from '../responses/artist.js';

export default {
  '/api/artists': {
    summary: 'gets all the artists',
    description: 'Gets all the artists in database...',
    get: {
      tags: ['Artist'],
      responses: artistResponse,
    },
  },

  '/api/artist': {
    summary: 'create a new artist',
    description: 'create a new artist...',
    post: {
      tags: ['Artist'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArtistInput',
            },
          },
        },
      },
      responses: artistResponse,
    },
    put: {
      tags: ['Artist'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ArtistInput',
            },
          },
        },
      },
      responses: artistResponse,
    },
  },

  '/api/artist/{id}': {
    summary: 'Gets a artist user',
    description: 'Gets an existing artist in database...',
    get: {
      tags: ['Artist'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The artist id',
        },
      ],
      responses: artistResponse,
    },
    delete: {
      tags: ['Artist'],
      parameters: [
        {
          in: 'path',
          name: ' id',
          required: true,
          schema: {
            type: 'integer',
            minium: 1,
          },
          description: 'The artist id',
        },
      ],
      responses: artistResponse,
    },
  },
};
