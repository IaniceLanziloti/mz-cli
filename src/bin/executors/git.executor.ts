import { IExecutor } from "../interfaces/executor.interface";
import { BaseExecutor } from "./base.executor";

class GitExecutor extends BaseExecutor implements IExecutor {
  private executor = 'git';

  public exec(location: string, params: string[]): void {
    return super.exec(location, [this.executor, ...params])
  }
}

export { GitExecutor }