// imports
import DatabaseSeeder from './DatabaseSeeder.js';
import { UserFactory } from '../factories/index.js';
import entities from '../../models/index.js';

// new instance of db seeder
const dbSeeder = new DatabaseSeeder(
  process.env.DATABASE_TYPE,
  process.env.DATABASE_NAME,
  entities
);

dbSeeder.run(UserFactory, 10).then((records) => {
  console.log(`${records.length} seeded in db`);
  console.log(records);
});
