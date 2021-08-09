import { ICommand } from '@shared/commands/types/ICommand';

// import { helpCommand } from './HelpCommand';
import { nicknameCommand } from './NicknameCommand';
import { sendMessageCommand } from './SendMessageCommand';
import { clearCommand } from './ClearCommand';
import { countMembersOnRoleCommand } from './CountMembersOnRoleCommand';

const generalCommands: ICommand[] = [
  nicknameCommand,
  sendMessageCommand,
  clearCommand,
  countMembersOnRoleCommand,
];

export { generalCommands };
