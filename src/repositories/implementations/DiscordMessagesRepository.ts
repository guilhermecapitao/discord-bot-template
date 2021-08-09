import { MessageEmbed, Message, TextChannel } from 'discord.js';

import { IDiscordChannelsRepository } from '@repositories/IDiscordChannelsRepository';
import { IDiscordMessagesRepository } from '@repositories/IDiscordMessagesRepository';
import guildEnv from '@shared/constants/guildEnv';

export class DiscordMessagesRepository implements IDiscordMessagesRepository {
  constructor(private discordChannelsRepository: IDiscordChannelsRepository) {}

  public async sendLogMessage(
    message: string | MessageEmbed,
  ): Promise<Message | undefined> {
    const logChannel = this.discordChannelsRepository.getChannelById<TextChannel>(
      guildEnv.channels.botPrivate.id,
    );

    if (!logChannel) return undefined;

    const logMessage = await logChannel.send(message);

    return logMessage;
  }
}
