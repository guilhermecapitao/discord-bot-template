interface IChannel {
  name: string;
  id: string;
}

interface IRole {
  name: string;
  id: string;
}

export default interface IEnvironment {
  serverId: string;

  channels: {
    botPrivate: IChannel;
  };

  roles: {
    verified: IRole;
    team: IRole;
  };
}
