import { DiscordChannelsRepository } from '@repositories/implementations/DiscordChannelsRepository';
import { DiscordMessagesRepository } from '@repositories/implementations/DiscordMessagesRepository';

import { ClearCommand } from './ClearCommand';

const discordChannelsRepository = new DiscordChannelsRepository();
const discordMessagesRepository = new DiscordMessagesRepository(
  discordChannelsRepository,
);

export const clearCommand = new ClearCommand(
  {
    name: 'clear',
    description: 'Apagar grande quantidade de mensagens em um canal',
  },
  discordMessagesRepository,
);
