import { MessageEmbed } from 'discord.js';

import { IDiscordRolesRepository } from '@repositories/IDiscordRolesRepository';
import { IDiscordUsersRepository } from '@repositories/IDiscordUsersRepository';

import { Either, left, right } from '@core/logic/Either';

import { RoleNotFoundError } from '@shared/errors/RoleNotFoundError';
import { MemberIsNotAdminError } from '@shared/errors/MemberIsNotAdminError';

type CountMembersOnRoleRequest = {
  roleId: string;
};

type CountMembersOnRoleResponse = Either<MemberIsNotAdminError, MessageEmbed>;

export class CountMembersOnRole {
  constructor(
    private discordRolesRepository: IDiscordRolesRepository,
    private discordUsersRepository: IDiscordUsersRepository,
  ) {}

  public async execute({
    roleId,
  }: CountMembersOnRoleRequest): Promise<CountMembersOnRoleResponse> {
    const role = await this.discordRolesRepository.getRoleById(roleId);

    if (!role) return left(new RoleNotFoundError());

    const embedMessage = new MessageEmbed()
      .setColor(role.color)
      .addFields({
        name: `Count of Role: ${role.name}`,
        value: role.members.size,
      })
      .setAuthor(
        'RocketBot',
        `${this.discordUsersRepository.getBotAvatarURL()}`,
        'https://rocketseat.com.br/',
      );

    return right(embedMessage);
  }
}
