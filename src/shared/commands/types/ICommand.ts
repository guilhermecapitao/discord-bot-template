import { ICommandExecuteDTO } from './ICommandExecuteDTO';

abstract class ICommand {
  public abstract name: string;

  public abstract description: string;

  public abstract execute(data: ICommandExecuteDTO): Promise<void>;
}

export { ICommand };
