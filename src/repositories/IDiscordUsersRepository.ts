export type IJoinUserToGuildDTO = {
  userId: string;
  accessToken: string;
};

export abstract class IDiscordUsersRepository {
  public abstract joinUserToGuid(data: IJoinUserToGuildDTO): Promise<void>;

  public abstract getUserIdByAccessToken(accessToken: string): Promise<string>;
}
