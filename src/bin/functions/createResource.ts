import path from 'path'

import { createFolder } from "./utils"

const baseArchitecture = [ ]

const createArchitecture = (basePath:string, architecture:any) => { }

const createResource = (resource: string) => {
  const resourcePath = path.resolve(process.cwd(), 'src', 'resources', resource)
  createFolder(resourcePath);
  createArchitecture(resourcePath, baseArchitecture);
}

export { createResource };