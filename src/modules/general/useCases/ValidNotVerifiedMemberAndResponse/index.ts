import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordMembersRepository } from '@repositories/implementations/DiscordMembersRepository';
import { ValidNotVerifiedMemberAndResponse } from './ValidNotVerifiedMemberAndResponse';

const discordGuildsRepository = new DiscordGuildsRepository();

const discordMembersRepository = new DiscordMembersRepository(
  discordGuildsRepository,
);

export const validNotVerifiedMemberAndResponse = new ValidNotVerifiedMemberAndResponse(
  discordMembersRepository,
);
