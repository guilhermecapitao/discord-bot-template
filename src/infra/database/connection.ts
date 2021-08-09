import { createConnection } from 'typeorm';

export async function createDbConnection() {
  await createConnection().then(() => console.log('Database connected'));
}
