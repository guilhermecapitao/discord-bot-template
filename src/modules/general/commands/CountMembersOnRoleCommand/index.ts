import { CountMembersOnRoleCommand } from './CountMembersOnRoleCommand';

export const countMembersOnRoleCommand = new CountMembersOnRoleCommand({
  name: 'count-members',
  description: 'Retorna a quantidade de membros com a role enviada',
});
