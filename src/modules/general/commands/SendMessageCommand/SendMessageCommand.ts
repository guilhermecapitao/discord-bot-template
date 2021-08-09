import { sendMessageWithBot } from '@modules/general/useCases/SendMessageWithBot';
import { ICommand } from '@shared/commands/types/ICommand';
import { ICommandExecuteDTO } from '@shared/commands/types/ICommandExecuteDTO';
import guildEnv from '@shared/constants/guildEnv';

type SendMessageCommandOptions = {
  name: string;
  description: string;
};

export class SendMessageCommand implements ICommand {
  public name: string;

  public description: string;

  constructor({ name, description }: SendMessageCommandOptions) {
    this.name = name;
    this.description = description;
  }

  public async execute({ message, args }: ICommandExecuteDTO): Promise<void> {
    if (message.channel.id !== guildEnv.channels.botPrivate.id) {
      message.reply(
        `Esse comando só pode ser executado no canal ${guildEnv.channels.botPrivate.name}`,
      );
      return;
    }

    if (!args) return;

    const [channelIdToSendMessage, messageIdToCopy] = args;

    if (args.length <= 1) {
      message.reply(
        'você precisa informar 2 parâmetros para utilizar esse comando (ChannelID e MessageID)',
      );
      return;
    }

    const sendMessageWithBotResponse = await sendMessageWithBot.execute({
      channelIdToCopyMessage: message.channel.id,
      messageIdToCopyMessage: messageIdToCopy,
      channelIdToSendMessage,
    });

    message.reply(sendMessageWithBotResponse);
  }
}
