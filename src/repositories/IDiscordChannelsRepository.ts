import { Channel } from 'discord.js';

export abstract class IDiscordChannelsRepository {
  public abstract getChannelById<T = Channel>(channelId: string): T | undefined;
}
