import { IUseCaseError } from '@core/errors/IUseCaseError';

export class RoleNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super(`Role not found.`);
    this.name = 'RoleNotFoundError';
  }
}
