import { IUseCaseError } from '@core/errors/IUseCaseError';

export class InvalidNickname extends Error implements IUseCaseError {
  constructor() {
    super(`Nickname is invalid`);
    this.name = 'InvalidNickname';
    this.message =
      'Opa, parece que houve um erro ao registrar seu nick. É importante destacar que seu nick precisa ter dois nomes, sugerimos Nome + Sobrenome, e não pode conter caracteres especiais. Como nesse exemplo: `!nick Guilherme Capitão`. Bora tentar novamente? É só mandar o comando !nick seguido do seu nome e sobrenome.';
  }
}
