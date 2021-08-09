import { Either, left, right } from '@core/logic/Either';
import { Message } from 'discord.js';

import { checkIfMessageHasBannedLink } from '../useCases/CheckIfMessageHasBannedLink';

type moderationResponse = Either<undefined, undefined>;

export async function moderation(
  message: Message,
): Promise<moderationResponse> {
  const checkIfMessageHasBannedLinkResponse = await checkIfMessageHasBannedLink.execute(
    {
      content: message.content,
      authorId: message.author.id,
    },
  );

  if (checkIfMessageHasBannedLinkResponse.isRight()) {
    message.author.send(checkIfMessageHasBannedLinkResponse.value);

    await message.delete();
    return right(undefined);
  }

  return left(undefined);
}
