import typeorm from 'typeorm';

const { EntitySchema } = typeorm;

export default new EntitySchema({
  name: 'UserMeta',
  tableName: 'usermeta',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    firstname: {
      type: 'varchar',
    },
    lastname: {
      type: 'varchar',
    },
    username: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
    },
  },
});
