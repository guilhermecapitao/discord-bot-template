import { Router } from 'express';

const routes = Router();

routes.get('/howdy', (req, res) => {
  res.status(200).send({
    status: 'OK',
    message: 'Howdy partner!!!!!',
  });
});

export { routes };
