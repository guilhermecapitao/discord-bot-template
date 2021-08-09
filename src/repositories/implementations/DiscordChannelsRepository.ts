import { Channel } from 'discord.js';

import { client } from '@infra/client';

import { IDiscordChannelsRepository } from '../IDiscordChannelsRepository';

export class DiscordChannelsRepository implements IDiscordChannelsRepository {
  public getChannelById<T = Channel>(channelId: string): T | undefined {
    const channel = client.discordClient.channels.cache.get(channelId);

    return channel as T | undefined;
  }
}
