import IEnvironment from './types/IGuildEnv';

const prodEnvironment: IEnvironment = {
  serverId: '',

  channels: {
    botPrivate: {
      name: '',
      id: '',
    },
  },

  roles: {
    verified: {
      name: '',
      id: '',
    },
    team: {
      name: '',
      id: '',
    },
  },
};

export default prodEnvironment;
