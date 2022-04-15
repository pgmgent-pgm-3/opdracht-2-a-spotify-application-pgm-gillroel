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
    songs: {
      target: 'Song',
      type: 'many-to-many',
      cascade: true,
      joinTable: true,
    },
    user: { target: 'User', type: 'many-to-many', joinTable: true },
  },
});
