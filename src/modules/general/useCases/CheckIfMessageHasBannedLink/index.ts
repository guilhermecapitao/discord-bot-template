import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordMembersRepository } from '@repositories/implementations/DiscordMembersRepository';
import { CheckIfMessageHasBannedLink } from './CheckIfMessageHasBannedLink';

const discordGuildsRepository = new DiscordGuildsRepository();
const discordMembersRepository = new DiscordMembersRepository(
  discordGuildsRepository,
);

export const checkIfMessageHasBannedLink = new CheckIfMessageHasBannedLink(
  discordMembersRepository,
);
