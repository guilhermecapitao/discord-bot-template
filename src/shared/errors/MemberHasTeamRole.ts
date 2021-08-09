import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberHasTeamRole extends Error implements IUseCaseError {
  constructor() {
    super(`Member has team role`);
    this.name = 'MemberHasTeamRole';
  }
}
