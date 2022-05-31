import { execSync } from "child_process";
import { IExecutorRunParameters } from "../interfaces/executor.interface";

class BaseExecutor   {
  public run(params: IExecutorRunParameters) {
    const { location, command } = params;

    execSync(command, { 
      cwd: location,
      stdio:[0,1,2]
    });      
  }

  public exec(location: string, params: string[]) {
    const command = params.join(' ');
    //
    this.run({
      location,
      command
    });
  }
}

export { BaseExecutor }