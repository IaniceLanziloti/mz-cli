import { IExecutor } from "../interfaces/executor.interface";
import { BaseExecutor } from "./base.executor";

class YarnExecutor extends BaseExecutor implements IExecutor {
  private executor = 'yarn';

  public exec(location: string, params: string[]): void {
    return super.exec(location, [this.executor, ...params])
  }
}

export { YarnExecutor }