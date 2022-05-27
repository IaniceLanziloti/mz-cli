import { IPipeline } from "../interfaces/pipeline.interface";
import { BaseExecutor } from "./base.executor";
import { ExecutorFactory } from "./factory.executor";

class PipelineExecutor extends BaseExecutor {
  public static execute(pipeline:IPipeline) {
    const { title, commands } = pipeline;

    console.log(title);

    for (let command of commands) {
      const executor = ExecutorFactory.create(command.executor);
      
      executor.exec( command.location, command.params)
    }
  }
}

export { PipelineExecutor }
