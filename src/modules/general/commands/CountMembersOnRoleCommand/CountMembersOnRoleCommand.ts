import { countMembersOnRole } from '@modules/general/useCases/CountMembersOnRole';

import { ICommand } from '@shared/commands/types/ICommand';
import { ICommandExecuteDTO } from '@shared/commands/types/ICommandExecuteDTO';
import guildEnv from '@shared/constants/guildEnv';

type CountMembersOnRoleCommandOptions = {
  name: string;
  description: string;
};

export class CountMembersOnRoleCommand implements ICommand {
  public name: string;

  public description: string;

  constructor({ name, description }: CountMembersOnRoleCommandOptions) {
    this.name = name;
    this.description = description;
  }

  public async execute({ message }: ICommandExecuteDTO): Promise<void> {
    if (message.channel.id !== guildEnv.channels.botPrivate.id) {
      message.delete();
      return;
    }

    const role = message.mentions.roles.first();

    if (!role) {
      await message.reply(`you need to mention a role`);
      message.delete();
      return;
    }

    const countMembersOnRoleResponse = await countMembersOnRole.execute({
      roleId: role.id,
    });

    if (countMembersOnRoleResponse.isRight()) {
      await message.reply(countMembersOnRoleResponse.value);
      message.delete();
    }
  }
}
