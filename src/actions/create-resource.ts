import { strings } from "@angular-devkit/core";
import { PipelineExecutor } from "../executors";
import { IPipeline } from "../interfaces/pipeline.interface";

const createResource = (resourcePath: string) => {
  const [domain, resource] = (resourcePath.includes('/') ? resourcePath.split('/') : ['',resourcePath]);

  const dasherizedResource = strings.dasherize(resource);
  const dasherizedDomain = strings.dasherize(domain);
  
  const pipeline:IPipeline = {
     title: `Creating ${dasherizedResource} resource`, 
     commands:[
       {
        location: process.cwd(),
        executor: 'Schematics',
        params:[
          'resource',
          `--name=${dasherizedResource}`,
          (domain ? `--domain=${dasherizedDomain}`:'')
          
        ]
       }
     ]
  }

  PipelineExecutor.execute(pipeline);
}

export { createResource };