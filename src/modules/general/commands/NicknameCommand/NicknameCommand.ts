import { addVerifiedRoleToMember } from '@modules/general/useCases/AddVerifiedRoleToMember';
import { validAndChangeMemberNickname } from '@modules/general/useCases/ValidAndChangeMemberNickname';

import { ICommand } from '@shared/commands/types/ICommand';
import { ICommandExecuteDTO } from '@shared/commands/types/ICommandExecuteDTO';

type NicknameCommandOptions = {
  name: string;
  description: string;
};

export class NicknameCommand implements ICommand {
  public name: string;

  public description: string;

  constructor({ name, description }: NicknameCommandOptions) {
    this.name = name;
    this.description = description;
  }

  public async execute({
    message,
    content,
  }: ICommandExecuteDTO): Promise<void> {
    if (!content) return;

    const isPrivateChannel = message.channel.type === 'dm';

    if (content.length > 32) {
      await message.reply(
        `Não foi possível alterar seu nickname, pois ele só pode conter até 32 caracteres (incluindo espaços). Por favor, tente alterar novamente :purple_heart:`,
      );
      return;
    }

    if (content === 'Nome Sobrenome') {
      await message.reply(
        `Ops, houve um problema na mudança de nick! O nome "Nome Sobrenome" é apenas um exemplo, você pode substituí-lo pelo seu nome verdadeiro :purple_heart:`,
      );
      return;
    }

    const changeNicknameResponse = await validAndChangeMemberNickname.execute({
      newNickname: content,
      memberId: message.author.id,
    });

    if (changeNicknameResponse.isRight()) {
      const successMessage = isPrivateChannel
        ? changeNicknameResponse.value
        : `${changeNicknameResponse.value}\n\n*Essa mensagem será apagada em 20 segundos*`;

      const replyMessage = await message.reply(successMessage);

      if (!isPrivateChannel) {
        message.delete();
        replyMessage.delete({ timeout: 20000 });
      }

      if (isPrivateChannel) {
        const addVerifiedRoleToMemberResponse = await addVerifiedRoleToMember.execute(
          {
            memberId: message.author.id,
          },
        );

        if (addVerifiedRoleToMemberResponse.isRight()) {
          await message.reply(addVerifiedRoleToMemberResponse.value);
        }
      }

      return;
    }

    const errorMessage = isPrivateChannel
      ? changeNicknameResponse.value.message
      : `${changeNicknameResponse.value.message}\n\n*Essa mensagem será apagada em 20 segundos*`;

    const replyErrorMessage = await message.reply(errorMessage);

    if (!isPrivateChannel) {
      message.delete();
      replyErrorMessage.delete({ timeout: 20000 });
    }
  }
}
