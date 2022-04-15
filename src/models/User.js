import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
  relations: {
    playlist: {
      target: 'Playlist',
      type: 'many-to-many',
      cascade: true,
      joinTable: true,
    },
    userMeta: {
      target: 'UserMeta',
      type: 'one-to-one',
      cascade: true,
      joinColumn: true,
      onDelete: 'CASCADE',
    },
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: true,
      inverseSide: 'user',
    },
  },
});
