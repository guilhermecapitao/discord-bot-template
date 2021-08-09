import { DiscordGuildsRepository } from '@repositories/implementations/DiscordGuildsRepository';
import { DiscordRolesRepository } from '@repositories/implementations/DiscordRolesRepository';
import { DiscordUsersRepository } from '@repositories/implementations/DiscordUsersRepository';

import { CountMembersOnRole } from './CountMembersOnRole';

const discordGuildsRepository = new DiscordGuildsRepository();
const discordRolesRepository = new DiscordRolesRepository(
  discordGuildsRepository,
);

const discordUsersRepository = new DiscordUsersRepository();

export const countMembersOnRole = new CountMembersOnRole(
  discordRolesRepository,
  discordUsersRepository,
);
