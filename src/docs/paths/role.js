import roleResponse from '../responses/role.js';

export default {
  '/api/roles': {
    summary: 'Gets all the roles',
    description: 'Gets all the roles in database...',
    get: {
      tags: ['Role'],
      responses: roleResponse,
    },
  },

  '/api/role': {
    summary: 'create a new role',
    description: 'create a new role...',
    post: {
      tags: ['Role'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RoleInput',
            },
          },
        },
      },
      responses: roleResponse,
    },
    put: {
      tags: ['Role'],
      requestBody: {
        require: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Role',
            },
          },
        },
      },
      responses: roleResponse,
    },
  },
};
