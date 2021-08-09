import axios, { AxiosInstance } from 'axios';

import {
  IDiscordOAuthRepository,
  ISendOAuthRequestDTO,
  ISendOAuthRequestResponseDTO,
} from '@repositories/IDiscordOAuthRepository';

export class DiscordOAuthRepository implements IDiscordOAuthRepository {
  private discordApi: AxiosInstance;

  constructor() {
    this.discordApi = axios.create({ baseURL: 'https://discord.com/api' });
  }

  public async sendOAuthRequest({
    queryParams,
    headers,
  }: ISendOAuthRequestDTO): Promise<ISendOAuthRequestResponseDTO> {
    const response = await this.discordApi.post('/oauth2/token', queryParams, {
      headers,
    });

    return {
      accessToken: response.data.access_token,
    };
  }
}
