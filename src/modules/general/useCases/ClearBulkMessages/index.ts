import { DiscordChannelsRepository } from '@repositories/implementations/DiscordChannelsRepository';
import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordMembersRepository } from '@repositories/implementations/DiscordMembersRepository';

import { ClearBulkMessages } from './ClearBulkMessages';

const discordGuildsRepository = new DiscordGuildsRepository();
const discordMembersRepository = new DiscordMembersRepository(
  discordGuildsRepository,
);

const discordChannelsRepository = new DiscordChannelsRepository();

export const clearBulkMessages = new ClearBulkMessages(
  discordMembersRepository,
  discordChannelsRepository,
);
