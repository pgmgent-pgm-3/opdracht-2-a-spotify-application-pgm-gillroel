import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'Role',
  tableName: 'role',
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
    users: {
      target: 'User',
      type: 'one-to-many',
      cascade: true,
      inverseSide: 'role',
    },
  },
});
