import { MessageEmbed } from 'discord.js';

export class CreateHelpMessage {
  public execute(): MessageEmbed {
    const helpMessage = new MessageEmbed().setTitle('Precisando de ajuda?')
      .setDescription(`
Estou aqui para te ajudar. Você pode executar qualquer comando abaixo em um dos canais da comunidade, mas fique tranquilo(a), assim que o comando for acionado, sua mensagem será apagada do chat.

Os comandos do bot são:
    `);

    return helpMessage;
  }
}
