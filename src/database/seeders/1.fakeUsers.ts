import faker from 'faker';
import { Seed } from '../migrate';

const fakeUsers = Array(15)
  .fill(0)
  .map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
  }));

export function up(query): Promise<Seed> {
  return query.bulkInsert('Users', fakeUsers);
}

export function down(): Promise<unknown> {
  // Before seeder.down migrator.down deletes User table
  return Promise.resolve();
}
