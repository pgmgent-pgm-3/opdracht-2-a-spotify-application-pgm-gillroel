import typeorm, { MaxKey } from 'typeorm';
import user from '../../docs/responses/user.js';
import Factory from './Factory.js';

const { createConnection, getConnection } = typeorm;

class UserFactory extends Factory {
  constructor() {
    super();
  }
}

  // make one record
  async make() {

    const user = {
      email: faker.internet.email(firstName?: string, lastName?: string),
      password: faker.internet.password(),
      userMeta: {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(firstName?: string, lastName?: string): string,
        avatar: faker.internet.avatar()
      },
      role: {
        id: 2
      }
    }

    const record = await this.insert(user);

    this.inserted.push(record);

  }

    async insert(user) {
      const repo = await getConnection().getRepository("User");
  
      // record exists?
      let record = await repo.findOne({ where: { email: user.email } });
      if (record) return record;
  
      // create record
      record = await repo.save({  email: user.email,
      password: user.password,
      userMeta: {
        firstname: user.userMeta.firstname,
        lastname: user.userMeta.lastname,
        username: user.userMeta.username,
        avatar: user.userMeta.avatar
      },
      role: {
        id: 2
      } });
  
      // return
      return record;
    }
  }



    export default new UserFactory();