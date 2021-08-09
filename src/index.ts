import 'dotenv/config';

import { client } from './infra/client';
import { Server } from './infra/server';
import { createDbConnection } from './infra/database/connection';

async function start() {
  await createDbConnection();

  await client.start();

  const server = new Server();
  server.start();
}

start();
