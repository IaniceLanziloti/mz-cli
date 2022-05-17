import fs from 'fs'
import path from 'path'

const createConfigurationFile = (filePath:string) => {
  const configurationFilename = "mz-cli.json";
  const configurationContent = {
    "rootDir": "./src"
  }

  fs.writeFileSync(
    path.resolve(filePath,configurationFilename),
    JSON.stringify(configurationContent)
  )
}

export { createConfigurationFile }