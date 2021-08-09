import { Role, GuildMember } from 'discord.js';

export type IAddRoleToMemberDTO = {
  memberId: string;
  roleOrRoles: Role | Role[];
};

export abstract class IDiscordMembersRepository {
  public abstract getMemberById(
    memberId: string,
  ): Promise<GuildMember | undefined>;

  public abstract changeMemberNickname(
    memberId: string,
    newNickname: string,
  ): Promise<void>;

  public abstract isAdmin(memberId: string): Promise<boolean>;

  public abstract isFromTeam(memberId: string): Promise<boolean>;

  public abstract addRoleToMember(data: IAddRoleToMemberDTO): Promise<void>;
}
