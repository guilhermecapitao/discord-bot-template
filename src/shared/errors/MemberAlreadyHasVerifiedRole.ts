import { IUseCaseError } from '@core/errors/IUseCaseError';

export class MemberAlreadyHasVerifiedRole
  extends Error
  implements IUseCaseError {
  constructor() {
    super(`Member already has 'verifed' role`);
    this.name = 'MemberAlreadyHasVerifiedRole';
  }
}
