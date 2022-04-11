import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Playlist',
  tableName: 'playlists',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      cascade: true,
      joinColumn: true,
    },
    playlists: {
      target: 'Song',
      type: 'many-to-many',
      cascade: true,
      joinColumn: true,
    },
  },
});
