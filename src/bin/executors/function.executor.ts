import { IExecutor } from "../interfaces/executor.interface";
import { BaseExecutor } from "./base.executor";

class FunctionExecutor extends BaseExecutor implements IExecutor {
  public exec(location: string, params: any) {
    return params();
  }  
}

export { FunctionExecutor }