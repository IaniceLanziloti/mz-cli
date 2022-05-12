import { execSync } from 'child_process'

const run = (location = process.cwd(), command = '') => {
  execSync(command, { 
    cwd: location,
    stdio:[0,1,2]
  });
}

export { run }