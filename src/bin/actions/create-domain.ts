import path from "path";

import { createFolder, getSourceRoot } from "./utils";
import { PipelineExecutor } from "../executors";
import { IPipeline } from "../interfaces/pipeline.interface";
import { ICommand } from "../interfaces/command.interface";

interface IDirectoriesDefs {
  name:string;
  subDirectories?: IDirectoriesDefs[]
}

interface IDomainArchitecture {
  sourcePath: string;
  domainsPath: string;
  directories: IDirectoriesDefs[]
}

const directoriesDefsToCommand = (basePath:string, directories:IDirectoriesDefs[]): ICommand[] => {
  const result:ICommand[] = [];

  for (let directory of directories ) {
    const location = path.resolve(basePath, directory.name);
    result.push({
      location,
      executor:'Function',
      params: () => createFolder(location)
    })

    if (directory.subDirectories) {
      result.push(...directoriesDefsToCommand(location, directory.subDirectories))
    }
  }
  return result;
}

const createDomain = (domain:string) =>{
  const sourcePath = getSourceRoot()
  const domainsPath = path.resolve( sourcePath,'domains');

  const baseArchitecture: IDomainArchitecture = {
    sourcePath,
    domainsPath,
    directories:[
      { 
        name: "domains",
        subDirectories:[
          { 
            name: domain,
            subDirectories:[
              { name: "interfaces" },
              { name: "services" },
              {
                name: "dtos",
                subDirectories:[
                  { name: "controllers" },
                  { name: "interfaces" },
                  { name: "services" },
                ]
              },
              {
                name: "http",
                subDirectories:[
                  { name: "controllers"},
                  { name: "routes" }
                ]
              },
              {
                name: "orm",
                subDirectories:[
                  { name: "entities" },
                  { name: "implementations" },
                  { name: "mocks" }
                ]
              },
            ]
          }
        ]
      }
    ]
  }

  const commands: ICommand[] = directoriesDefsToCommand(
    baseArchitecture.sourcePath, baseArchitecture.directories);

  const pipeline: IPipeline = {
    title: `Creating ${domain} domain`,
    commands
  }

  PipelineExecutor.execute(pipeline);
}

export { createDomain };