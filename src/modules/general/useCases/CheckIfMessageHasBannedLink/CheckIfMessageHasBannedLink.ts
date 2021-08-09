import { MessageEmbed } from 'discord.js';

import { Either, left, right } from '@core/logic/Either';
import { IDiscordMembersRepository } from '@repositories/IDiscordMembersRepository';

type CheckIfMessageHasBannedLinkResponse = Either<undefined, MessageEmbed>;

type CheckIfMessageHasBannedLinkRequest = {
  content: string;
  authorId: string;
};

export class CheckIfMessageHasBannedLink {
  constructor(private discordMembersRepository: IDiscordMembersRepository) {}

  public async execute({
    content,
    authorId,
  }: CheckIfMessageHasBannedLinkRequest): Promise<CheckIfMessageHasBannedLinkResponse> {
    const isAdmin = await this.discordMembersRepository.isAdmin(authorId);
    if (isAdmin) return left(undefined);

    const links = ['discord.gg', 't.me', 'chat.whatsapp', 'wa.me'];
    const contentLowerCase = content.toLowerCase();

    let messageHasLink = false;
    let foundMessage = '';

    links.forEach(link => {
      if (contentLowerCase.includes(link.toLocaleLowerCase())) {
        messageHasLink = true;
        foundMessage = link;
      }
    });

    if (!messageHasLink) return left(undefined);

    const embedMessage = new MessageEmbed()
      .setColor('#8257E6')
      .addFields({
        name: `
          \n\u200b
Motivo: convite para grupo outros grupos`,
        value: `
Sua mensagem foi deletada, pois contém um link não permitido no servidor. Se você acha que a remoção foi feita de forma indevida, por favor entre em contato com qualquer membro do nosso time 💜.
          \n\u200b
Mensagem: \`${foundMessage}\`
        `,
      })
      .setAuthor(
        'RocketBot - Mensagem moderada',
        'https://i.imgur.com/0d8SMuM.png',
        'https://rocketseat.com.br/',
      );

    return right(embedMessage);
  }
}
