import { IExecutor } from '../interfaces/executor.interface';
import { FileSystemExecutor } from './file-system.executor';
import { FunctionExecutor } from './function.executor';
import { GitExecutor } from './git.executor';
import { YarnExecutor } from './yarn.executor';


class ExecutorFactory {
  public static create(executor: 'FileSystem' | 'Function' | 'Git' | 'Yarn'): IExecutor {
    const executors = {
      FileSystem: new FileSystemExecutor (),
      Function: new FunctionExecutor(),
      Git: new GitExecutor(),
      Yarn: new YarnExecutor()
    }

    return executors[executor];   
  }
}

export { ExecutorFactory }