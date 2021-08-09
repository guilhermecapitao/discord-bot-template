import { TextChannel } from 'discord.js';

import { Either, left, right } from '@core/logic/Either';

import { IDiscordMembersRepository } from '@repositories/IDiscordMembersRepository';
import { IDiscordChannelsRepository } from '@repositories/IDiscordChannelsRepository';

import { ChannelNotFoundError } from '@shared/errors/ChannelNotFoundError';
import { MemberIsNotAdminError } from '@shared/errors/MemberIsNotAdminError';
import { MemberIsNotFromTeamError } from '@shared/errors/MemberIsNotFromTeamError';

type ClearBulkMessagesRequest = {
  authorId: string;
  quantityMessages: number;
  channelId: string;
};

type ClearBulkMessagesResponse = Either<
  | MemberIsNotAdminError
  | MemberIsNotFromTeamError
  | ChannelNotFoundError
  | string,
  undefined
>;

export class ClearBulkMessages {
  constructor(
    private discordMembersRepository: IDiscordMembersRepository,
    private discordChannelsRepository: IDiscordChannelsRepository,
  ) {}

  public async execute({
    channelId,
    authorId,
    quantityMessages,
  }: ClearBulkMessagesRequest): Promise<ClearBulkMessagesResponse> {
    const memberIsAdmin = await this.discordMembersRepository.isAdmin(authorId);
    const memberIsTeam = await this.discordMembersRepository.isFromTeam(
      authorId,
    );

    if (!memberIsAdmin) {
      return left(new MemberIsNotAdminError());
    }

    if (!memberIsTeam) {
      return left(new MemberIsNotFromTeamError());
    }

    const channel = this.discordChannelsRepository.getChannelById<TextChannel>(
      channelId,
    );

    if (!channel) {
      return left(new ChannelNotFoundError());
    }

    try {
      await channel.bulkDelete(quantityMessages + 1);
    } catch (err) {
      return left(err.message);
    }

    return right(undefined);
  }
}
