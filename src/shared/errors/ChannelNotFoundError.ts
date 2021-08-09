import { IUseCaseError } from '@core/errors/IUseCaseError';

export class ChannelNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super(`Channel not found.`);
    this.name = 'ChannelNotFound';
  }
}
