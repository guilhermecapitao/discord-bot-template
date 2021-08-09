import { clearBulkMessages } from '@modules/general/useCases/ClearBulkMessages';
import { IDiscordMessagesRepository } from '@repositories/IDiscordMessagesRepository';

import { ICommand } from '@shared/commands/types/ICommand';
import { ICommandExecuteDTO } from '@shared/commands/types/ICommandExecuteDTO';

type ClearCommandOptions = {
  name: string;
  description: string;
};

export class ClearCommand implements ICommand {
  public name: string;

  public description: string;

  constructor(
    { name, description }: ClearCommandOptions,
    private discordMessagesRepository: IDiscordMessagesRepository,
  ) {
    this.name = name;
    this.description = description;
  }

  public async execute({ message, args }: ICommandExecuteDTO): Promise<void> {
    if (message.channel.type === 'dm') {
      await message.reply(
        `${message.author}, clear command doesn't work on DM`,
      );
      await message.delete();
      return;
    }

    if (args === undefined) {
      await this.discordMessagesRepository.sendLogMessage(
        `${message.author}, you need to pass a number of messages to be deleted`,
      );
      await message.delete();
      return;
    }

    if (args.length !== 1) {
      await this.discordMessagesRepository.sendLogMessage(
        `${message.author}, you need to pass **only** one number of messages to be deleted`,
      );
      await message.delete();
      return;
    }

    const [quantityMessages] = args;
    const quantityMessagesAsNumber = Number(quantityMessages);

    if (Number.isNaN(quantityMessagesAsNumber)) {
      await this.discordMessagesRepository.sendLogMessage(
        `${message.author}, you need to pass a valid number `,
      );
      await message.delete();
      return;
    }

    const clearBulkMessagesResponse = await clearBulkMessages.execute({
      authorId: message.author.id,
      quantityMessages: quantityMessagesAsNumber,
      channelId: message.channel.id,
    });

    if (clearBulkMessagesResponse.isRight()) return;

    await message.delete();

    const { value } = clearBulkMessagesResponse;

    const baseMessageResponse = `${message.author} - \`!clear\` `;

    if (typeof value === 'string') {
      await this.discordMessagesRepository.sendLogMessage(
        `${baseMessageResponse} - ${value}`,
      );
      return;
    }

    await this.discordMessagesRepository.sendLogMessage(
      `${baseMessageResponse} - ${value.message}`,
    );
  }
}
