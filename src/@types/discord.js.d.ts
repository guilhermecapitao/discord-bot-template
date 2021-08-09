/* eslint-disable @typescript-eslint/naming-convention */
import { ICommand } from '@shared/commands/types/ICommand';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, ICommand>;
  }
}
