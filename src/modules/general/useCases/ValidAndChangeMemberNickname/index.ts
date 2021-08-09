import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordMembersRepository } from '@repositories/implementations/DiscordMembersRepository';
import { ValidAndChangeMemberNickname } from './ValidAndChangeMemberNickname';

const discordGuildsRepository = new DiscordGuildsRepository();
const discordMembersRepository = new DiscordMembersRepository(
  discordGuildsRepository,
);

export const validAndChangeMemberNickname = new ValidAndChangeMemberNickname(
  discordMembersRepository,
);
