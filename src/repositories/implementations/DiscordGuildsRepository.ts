import { Guild } from 'discord.js';

import { client } from '@infra/client';

import { IDiscordGuildsRepository } from '../IDiscordGuildsRepository';

export class DiscordGuildsRepository implements IDiscordGuildsRepository {
  public getGuildById(serverId: string): Guild | undefined {
    const guild = client.discordClient.guilds.cache.get(serverId);

    return guild;
  }
}
