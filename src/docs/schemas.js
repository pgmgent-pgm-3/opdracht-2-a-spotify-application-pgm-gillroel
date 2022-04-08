export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      userMeta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
  },
  UserInput: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
      userMeta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
    },
    example: {
      email: 'gillesroels@outlook.be',
      password: 'gilles',
      userMeta: {
        firstname: 'Gilles',
        lastname: 'Roels',
        username: 'Giro',
        avatar: 'foto1.png',
      },
      role: {
        name: 'Admin',
      },
    },
  },

  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      username: { type: 'string' },
      avatar: { type: 'string' },
    },
  },

  Role: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  },
};
