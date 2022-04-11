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
        id: 1,
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
  RoleInput: {
    properties: {
      name: { type: 'string' },
    },
    example: {
      name: 'Moderator',
    },
  },

  Album: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
    },
  },
  AlbumInput: {
    properties: {
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
    },
    example: {
      name: 'Album1',
      artist: {
        id: 1,
      },
    },
  },
  Artist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
    },
  },
  ArtistInput: {
    properties: {
      name: { type: 'string' },
    },
    example: {
      name: 'K3',
    },
  },
  Playlist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      user: {
        $ref: '#/components/schemas/User',
      },
    },
  },
  PlaylistInput: {
    properties: {
      name: { type: 'string' },
      user: {
        $ref: '#/components/schemas/User',
      },
    },
    example: {
      name: 'playlist1',
      user: {
        id: 33,
      },
    },
  },
  Song: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
    },
  },
  SongInput: {
    properties: {
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
    },
    example: {
      name: 'song1',
      artist: {
        id: 1,
      },
    },
  },
};
