import { createHelpMessage } from '@modules/general/useCases/CreateHelpMessage';

import { ICommand } from '@shared/commands/types/ICommand';
import { ICommandExecuteDTO } from '@shared/commands/types/ICommandExecuteDTO';

type HelpCommandOptions = {
  name: string;
  description: string;
};

export class HelpCommand implements ICommand {
  public name: string;

  public description: string;

  constructor({ name, description }: HelpCommandOptions) {
    this.name = name;
    this.description = description;
  }

  public async execute({ message }: ICommandExecuteDTO): Promise<void> {
    if (message.channel.type === 'dm') {
      throw new Error('Help command does not work on DM');
    }

    const helpMessage = createHelpMessage.execute();

    message.reply(helpMessage);
  }
}
