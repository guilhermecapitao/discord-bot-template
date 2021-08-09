import prodEnvironment from './prodGuildEnv';
import devEnvironment from './devGuildEnv';

export default process.env.NODE_ENV === 'development'
  ? devEnvironment
  : prodEnvironment;
