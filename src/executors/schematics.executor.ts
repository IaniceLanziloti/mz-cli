import { IExecutor } from "../interfaces/executor.interface";
import { BaseExecutor } from "./base.executor";

class SchematicsExecutor extends BaseExecutor implements IExecutor {
  private executor = require.resolve('@angular-devkit/schematics-cli/bin/schematics.js',{
    paths: module.paths
  });

  public exec(location: string, params: string[]): void {
    const command = params.shift()


    return super.exec(location, [
      this.executor,
      `@mzgroup/schematics:${command}`,
      ...params
    ])
  }
}

export { SchematicsExecutor }