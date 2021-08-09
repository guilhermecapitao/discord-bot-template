import { Role } from 'discord.js';

export abstract class IDiscordRolesRepository {
  public abstract getRoleByName(roleName: string): Promise<Role | undefined>;

  public abstract getRoleById(roleId: string): Promise<Role | undefined>;
}
