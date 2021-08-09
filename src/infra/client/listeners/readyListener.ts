import { DiscordChannelsRepository } from '@repositories/implementations/DiscordChannelsRepository';
import { DiscordMessagesRepository } from '@repositories/implementations/DiscordMessagesRepository';

export async function readyListener() {
  const discordChannelsRepository = new DiscordChannelsRepository();
  const discordMessagesRepository = new DiscordMessagesRepository(
    discordChannelsRepository,
  );

  if (process.env.NODE_ENV === 'production') {
    await discordMessagesRepository.sendLogMessage('Restarted :rocket:');
  }
}
