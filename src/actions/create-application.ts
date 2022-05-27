import path from 'path'
import { strings } from '@angular-devkit/core'

import { IPipeline } from '../interfaces/pipeline.interface'
import { PipelineExecutor } from '../executors';
import { createConfigurationFile } from '../utils';

const createApplication = (appName='mz-application') => {   
  const dasherizedAppName = strings.dasherize(appName)

  const appPath = path.resolve(process.cwd(), dasherizedAppName);

  const pipeline:IPipeline = {
    title:`Creating application ${appName}`,
    commands:[
      {
        location: process.cwd(),
        executor:'Schematics',
        params:[
          'application',
          `--name=${appName}`
        ]
      },
      {
        location: appPath,
        executor: 'Git',
        params: ['init']
      },
      {
        location: appPath,
        executor: 'Yarn',
        params: []
      },
      {
        location: appPath,
        executor: "Function",
        params: () => createConfigurationFile(appPath)
      }
    ]
    // commands:[
    //   {
    //     location:process.cwd(),
    //     executor:'Git',
    //     params:[
    //       'clone',
    //       'git@github.com:IaniceLanziloti/mz-node-boilerplate.git',
    //       appName,
    //     ]
    //   },
    //   {
    //     location: appPath,
    //     executor: 'FileSystem',
    //     params:['rm','-r','--force','.git',]
    //   },
    //   {
    //     location: appPath,
    //     executor: 'Git',
    //     params:['init']
    //   },
    //   {
    //     location: appPath,
    //     executor:'Yarn',
    //     params:['--silent']
    //   },
    //   {
    //     location: appPath,
    //     executor: "Function",
    //     params: () => createConfigurationFile(appPath)
    //   }
    // ]
  }

  PipelineExecutor.execute(pipeline)
 
}

export { createApplication }