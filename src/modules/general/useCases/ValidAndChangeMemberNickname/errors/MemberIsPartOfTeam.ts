import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberIsPartOfTeam extends Error implements IUseCaseError {
  constructor() {
    super('Member is part of team');
    this.name = 'MemberIsPartOfTeam';
    this.message = `você pode fazer essa troca diretamente no discord sendo um membro do time :rocket:`;
  }
}
