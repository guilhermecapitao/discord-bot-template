import { Message } from 'discord.js';

export interface ICommandExecuteDTO {
  message: Message;
  content?: string;
  args?: string[];
}
