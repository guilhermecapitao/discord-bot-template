import { Guild } from 'discord.js';

export abstract class IDiscordGuildsRepository {
  public abstract getGuildById(serverId: string): Guild | undefined;
}
