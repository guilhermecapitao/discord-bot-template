import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super(`Member not found.`);
    this.name = 'MemberNotFoundError';
  }
}
