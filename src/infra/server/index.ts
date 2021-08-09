import express, { Express } from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import { routes } from './routes/index.routes';

export class Server {
  private server: Express;

  constructor() {
    this.server = express();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }

  private errors() {
    this.server.use(celebrateErrors());
  }

  public start() {
    this.middlewares();
    this.routes();
    this.errors();

    this.server.listen(3333, () => {
      // eslint-disable-next-line no-console
      console.log('Server started on port 3333');
    });
  }
}
