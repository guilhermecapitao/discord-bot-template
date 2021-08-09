import { IDiscordChannelsRepository } from '@repositories/IDiscordChannelsRepository';
import { TextChannel } from 'discord.js';

type SendMessageWithBotRequest = {
  channelIdToSendMessage: string;
  channelIdToCopyMessage: string;
  messageIdToCopyMessage: string;
};

export class SendMessageWithBot {
  constructor(private discordChannelsRepository: IDiscordChannelsRepository) {}

  public async execute({
    channelIdToSendMessage,
    channelIdToCopyMessage,
    messageIdToCopyMessage,
  }: SendMessageWithBotRequest): Promise<string> {
    const channelToSendMessage = this.discordChannelsRepository.getChannelById<TextChannel>(
      channelIdToSendMessage,
    );

    const channelToCopyMessage = this.discordChannelsRepository.getChannelById<TextChannel>(
      channelIdToCopyMessage,
    );

    if (!channelToCopyMessage) {
      return 'you need to enter a valid channel ID to copy a message';
    }

    await channelToCopyMessage.messages.fetch();

    const messageToCopy = channelToCopyMessage.messages.cache.get(
      messageIdToCopyMessage,
    );

    if (!channelToSendMessage) {
      return `you need to enter a valid channel ID`;
    }

    if (!messageToCopy) {
      return `you need to enter a valid message ID`;
    }

    await channelToSendMessage.send(messageToCopy.content, {
      files: messageToCopy.attachments.map(attachment => attachment),
    });

    await channelToSendMessage.send(messageToCopy.content);

    return `message sent!`;
  }
}
