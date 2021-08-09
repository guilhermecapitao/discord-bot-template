import axios, { AxiosInstance } from 'axios';

import {
  IDiscordUsersRepository,
  IJoinUserToGuildDTO,
} from '@repositories/IDiscordUsersRepository';
import { botConfig } from '@config/botConfig';
import guildEnv from '@shared/constants/guildEnv';

export class DiscordUsersRepository implements IDiscordUsersRepository {
  private discordApi: AxiosInstance;

  constructor() {
    this.discordApi = axios.create({ baseURL: 'https://discord.com/api' });
  }

  public async joinUserToGuid({
    userId,
    accessToken,
  }: IJoinUserToGuildDTO): Promise<void> {
    await this.discordApi.put(
      `/guilds/${guildEnv.serverId}/members/${userId}`,
      {
        access_token: accessToken,
      },
      {
        headers: {
          Authorization: `Bot ${botConfig.token}`,
          ContentType: 'application/json',
        },
      },
    );
  }

  public async getUserIdByAccessToken(accessToken: string): Promise<string> {
    const response = await this.discordApi.get(`/users/@me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.id;
  }
}
