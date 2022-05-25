import fs from 'fs';

const createFolder = (folder:string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

export { createFolder }