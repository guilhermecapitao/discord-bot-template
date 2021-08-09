import { Either, left, right } from '@core/logic/Either';

import { IDiscordRolesRepository } from '@repositories/IDiscordRolesRepository';
import { IDiscordMembersRepository } from '@repositories/IDiscordMembersRepository';

import { RoleNotFoundError } from '@shared/errors/RoleNotFoundError';
import { MemberNotFoundError } from '@shared/errors/MemberNotFoundError';
import { MemberHasTeamRole } from '@shared/errors/MemberHasTeamRole';
import { MemberAlreadyHasVerifiedRole } from '@shared/errors/MemberAlreadyHasVerifiedRole';
import guildEnv from '@shared/constants/guildEnv';

interface IAddVerifiedRoleToMember {
  memberId: string;
}

type AddVerifiedRoleToMemberResponse = Either<
  | MemberNotFoundError
  | RoleNotFoundError
  | MemberAlreadyHasVerifiedRole
  | MemberHasTeamRole,
  string
>;

export class AddVerifiedRoleToMember {
  constructor(
    private discordMembersRepository: IDiscordMembersRepository,
    private discordRolesRepository: IDiscordRolesRepository,
  ) {}

  public async execute({
    memberId,
  }: IAddVerifiedRoleToMember): Promise<AddVerifiedRoleToMemberResponse> {
    const member = await this.discordMembersRepository.getMemberById(memberId);

    if (!member) {
      return left(new MemberNotFoundError());
    }

    const memberAlreadyVerified = member.roles.cache.has(
      guildEnv.roles.verified.id,
    );

    if (memberAlreadyVerified) {
      return left(new MemberAlreadyHasVerifiedRole());
    }

    const memberHasTeamRole = member.roles.cache.has(guildEnv.roles.team.id);

    if (memberHasTeamRole) {
      return left(new MemberHasTeamRole());
    }

    const verifiedRole = await this.discordRolesRepository.getRoleByName(
      guildEnv.roles.verified.name,
    );

    if (!verifiedRole) {
      return left(new RoleNotFoundError());
    }

    await member.roles.add(verifiedRole);

    return right(
      `Parabéns, ${
        member.nickname || member.displayName
      }! Você foi verificado com sucesso e já possui acesso aos demais canais do servidor!`,
    );
  }
}
