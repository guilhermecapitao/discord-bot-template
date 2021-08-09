import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberIsNotAdminError extends Error implements IUseCaseError {
  constructor() {
    super(`Member is not admin.`);
    this.name = 'MemberIsNotAdmin';
  }
}
