import { Either, left, right } from '@core/logic/Either';
import { IDiscordMembersRepository } from '@repositories/IDiscordMembersRepository';

import { InvalidNickname } from './errors/InvalidNickname';
import { MemberIsPartOfTeam } from './errors/MemberIsPartOfTeam';

type ValidAndChangeMemberNicknameResponse = Either<
  InvalidNickname | MemberIsPartOfTeam,
  string
>;

type ChangeMemberNicknameRequest = {
  memberId: string;
  newNickname: string;
};

export class ValidAndChangeMemberNickname {
  constructor(private discordMembersRepository: IDiscordMembersRepository) {}

  public async execute({
    newNickname,
    memberId,
  }: ChangeMemberNicknameRequest): Promise<ValidAndChangeMemberNicknameResponse> {
    const memberIsAdmin = await this.discordMembersRepository.isAdmin(memberId);
    const isFromTeam = await this.discordMembersRepository.isFromTeam(memberId);

    if (memberIsAdmin || isFromTeam) {
      return left(new MemberIsPartOfTeam());
    }

    if (!newNickname.match(/^[A-zÀ-ú ]*$/)) {
      return left(new InvalidNickname());
    }

    const arrNewNickname = newNickname.split(' ');

    if (arrNewNickname.length <= 1) {
      return left(new InvalidNickname());
    }

    await this.discordMembersRepository.changeMemberNickname(
      memberId,
      newNickname,
    );

    return right(`Seu nickname foi alterado! :rocket:`);
  }
}
