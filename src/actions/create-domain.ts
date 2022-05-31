import { PipelineExecutor } from "../executors";
import { IPipeline } from "../interfaces/pipeline.interface";

import { strings } from "@angular-devkit/core";

const createDomain = (domain:string) =>{
  const dasherizedDomain = strings.dasherize(domain);
  
  const pipeline:IPipeline = {
     title: `Creating ${dasherizedDomain} domain`, 
     commands:[
       {
        location: process.cwd(),
        executor: 'Schematics',
        params:[
          'domain',
          `--name=${dasherizedDomain}`
        ]
       }
     ]
  }

  PipelineExecutor.execute(pipeline);
}

export { createDomain };