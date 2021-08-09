import { DiscordChannelsRepository } from '@repositories/implementations/DiscordChannelsRepository';
import { SendMessageWithBot } from './SendMessageWithBot';

const discordChannelsRepository = new DiscordChannelsRepository();

export const sendMessageWithBot = new SendMessageWithBot(
  discordChannelsRepository,
);
