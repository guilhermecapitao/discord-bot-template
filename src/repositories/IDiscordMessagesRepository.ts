import { Message, MessageEmbed } from 'discord.js';

export abstract class IDiscordMessagesRepository {
  public abstract sendLogMessage(
    message: string | MessageEmbed,
  ): Promise<Message | undefined>;
}
