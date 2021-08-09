import { Role } from 'discord.js';

import { IDiscordRolesRepository } from '@repositories/IDiscordRolesRepository';
import { IDiscordGuildsRepository } from '@repositories/IDiscordGuildsRepository';
import guildEnv from '@shared/constants/guildEnv';

export class DiscordRolesRepository implements IDiscordRolesRepository {
  constructor(private discordGuildsRepository: IDiscordGuildsRepository) {}

  public async getRoleByName(roleName: string): Promise<Role | undefined> {
    const guild = this.discordGuildsRepository.getGuildById(guildEnv.serverId);

    if (!guild) {
      return undefined;
    }

    await guild.members.fetch();
    await guild.roles.fetch();

    const role = guild.roles.cache.find(
      findRole => findRole.name.toLowerCase() === roleName.toLowerCase(),
    );

    return role;
  }

  public async getRoleById(roleId: string): Promise<Role | undefined> {
    const guild = this.discordGuildsRepository.getGuildById(guildEnv.serverId);

    if (!guild) {
      return undefined;
    }

    await guild.members.fetch();
    await guild.roles.fetch();

    const role = guild.roles.cache.get(roleId);

    return role;
  }
}
