import { GuildMember } from 'discord.js';

import { IDiscordGuildsRepository } from '@repositories/IDiscordGuildsRepository';

import guildEnv from '@shared/constants/guildEnv';
import {
  IAddRoleToMemberDTO,
  IDiscordMembersRepository,
} from '../IDiscordMembersRepository';

export class DiscordMembersRepository implements IDiscordMembersRepository {
  constructor(private discordGuildsRepository: IDiscordGuildsRepository) {}

  public async addRoleToMember({
    memberId,
    roleOrRoles,
  }: IAddRoleToMemberDTO): Promise<void> {
    const member = await this.getMemberById(memberId);

    if (!member) return;

    await member.roles.add(roleOrRoles);
  }

  public async getMemberById(
    memberId: string,
  ): Promise<GuildMember | undefined> {
    const guild = this.discordGuildsRepository.getGuildById(guildEnv.serverId);
    if (!guild) return undefined;

    const member = guild.members.fetch(memberId);

    if (!member) return undefined;

    return member;
  }

  public async changeMemberNickname(
    memberId: string,
    newNickname: string,
  ): Promise<void> {
    const member = await this.getMemberById(memberId);

    if (!member) return;

    await member.setNickname(newNickname);
  }

  public async isAdmin(memberId: string): Promise<boolean> {
    const member = await this.getMemberById(memberId);

    if (!member) return false;

    return member.hasPermission('ADMINISTRATOR');
  }

  public async isFromTeam(memberId: string): Promise<boolean> {
    const member = await this.getMemberById(memberId);

    if (!member) return false;

    return member.roles.cache.has(guildEnv.roles.team.id);
  }
}
