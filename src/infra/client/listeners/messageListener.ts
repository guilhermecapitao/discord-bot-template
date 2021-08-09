import { Message } from 'discord.js';

import { commandConfig } from '@config/commandConfig';

import { client } from '@infra/client';

import { moderation } from '@modules/general/moderation';
import { validNotVerifiedMemberAndResponse } from '@modules/general/useCases/ValidNotVerifiedMemberAndResponse';

export async function messageListener(message: Message) {
  if (message.author.bot) return;

  if (message.channel.type === 'text') {
    const moderationResponse = await moderation(message);
    if (moderationResponse.isRight()) return;
  }

  if (message.content.startsWith(commandConfig.prefix)) {
    const content = message.content.slice(commandConfig.prefix.length).trim();
    const args = content.split(/ +/);
    const command = args[0].toLowerCase();

    args.shift();

    const commandFunction = client.discordClient.commands.get(command);

    if (!commandFunction) return;

    await commandFunction.execute({
      message,
      args,
      content: content.slice(command.length).trim(),
    });
  } else if (message.channel.type === 'dm') {
    const validNotVerifiedMember = await validNotVerifiedMemberAndResponse.execute(
      {
        memberId: message.author.id,
      },
    );

    if (validNotVerifiedMember.isRight()) {
      await message.reply(validNotVerifiedMember.value);
    }
  }
}
