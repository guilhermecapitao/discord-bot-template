import { Either, left, right } from '@core/logic/Either';
import { IDiscordMembersRepository } from '@repositories/IDiscordMembersRepository';
import guildEnv from '@shared/constants/guildEnv';
import { MemberAlreadyHasVerifiedRole } from '@shared/errors/MemberAlreadyHasVerifiedRole';
import { MemberHasTeamRole } from '@shared/errors/MemberHasTeamRole';
import { MemberNotFoundError } from '@shared/errors/MemberNotFoundError';
import { RoleNotFoundError } from '@shared/errors/RoleNotFoundError';

type ValidNotVerifiedMemberAndResponseRequest = {
  memberId: string;
};

type MemberNotYetVerifiedResponse = Either<
  MemberNotFoundError | RoleNotFoundError | MemberHasTeamRole,
  string
>;

export class ValidNotVerifiedMemberAndResponse {
  constructor(private discordMembersRepository: IDiscordMembersRepository) {}

  public async execute({
    memberId,
  }: ValidNotVerifiedMemberAndResponseRequest): Promise<MemberNotYetVerifiedResponse> {
    const member = await this.discordMembersRepository.getMemberById(memberId);

    if (!member) {
      return left(new MemberNotFoundError());
    }

    const memberHasTeamRole = member.roles.cache.has(guildEnv.roles.team.id);

    if (memberHasTeamRole) {
      return left(new MemberHasTeamRole());
    }

    const memberAlreadyVerified = member.roles.cache.has(
      guildEnv.roles.verified.id,
    );

    if (memberAlreadyVerified) {
      return left(new MemberAlreadyHasVerifiedRole());
    }

    return right(
      `Faaala dev! Você ainda não realizou o processo de onboarding, então para continuarmos preciso que você me informe seu nome através do comando \`!nick\` nesse formato: \`!nick Nome Sobrenome\`. `,
    );
  }
}
