import path from 'path'

import { createFolder } from "./utils"

const baseArchitecture = [
  { "dtos": ["controllers", "interfaces", "services"] },
  { "http": ["controllers", "routes",] },
  "interfaces",
  { "orm": ["entities", "implementations", "mocks"] },
  "services"
]

const createArchitecture = (basePath:string, architecture:any) => {
  for (let element of architecture) {
    switch (true) {
      case typeof element === "string":
        createFolder(path.resolve(basePath, element))
        break;
      case element.length > 0:
        createArchitecture(path.resolve(basePath, element), element)
        break;
      case typeof element === "object":
        const folder = Object.keys(element)[0];
        createArchitecture(path.resolve(basePath, folder), element[folder])
        break;
      default:
        console.error("Invalid architecture param", element)
        break;
    }

  }
}

const createDomain = (domain:string) => {
  const domainPath = path.resolve(process.cwd(), 'src', 'domains', domain)
  createFolder(domainPath);
  createArchitecture(domainPath, baseArchitecture);
}

export { createDomain };