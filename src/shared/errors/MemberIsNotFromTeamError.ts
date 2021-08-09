import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberIsNotFromTeamError extends Error implements IUseCaseError {
  constructor() {
    super(`Member is not part of team.`);
    this.name = 'MemberIsNotFromTeam';
  }
}
