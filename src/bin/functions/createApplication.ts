import path from 'path'
// import { fileURLToPath } from 'url';

import { run } from './runCommand'
import { dependences } from './dependences'

import { createFolder, copyFolder } from './utils'

const createApplication = (app='mz-application') => {
  
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);

  const appPath = path.resolve(process.cwd(), app)
  const modelsFolder = path.resolve(__dirname, '..','models')
  
  
  createFolder( appPath )
  copyFolder( modelsFolder, appPath )

  console.log( appPath );

  run(appPath, `npm init -y`)

  for (let dependece of dependences) {
    run(appPath, `npm i ${dependece}`)
  }
}

export { createApplication }