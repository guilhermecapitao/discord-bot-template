import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordMembersRepository } from '@repositories/implementations/DiscordMembersRepository';
import { DiscordRolesRepository } from '@repositories/implementations/DiscordRolesRepository';

import { AddVerifiedRoleToMember } from './AddVerifiedRoleToMember';

const discordGuildsRepository = new DiscordGuildsRepository();

const discordMembersRepository = new DiscordMembersRepository(
  discordGuildsRepository,
);

const discordRolesRepository = new DiscordRolesRepository(
  discordGuildsRepository,
);

export const addVerifiedRoleToMember = new AddVerifiedRoleToMember(
  discordMembersRepository,
  discordRolesRepository,
);
