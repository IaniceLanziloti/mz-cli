import fs from 'fs'

const createFolder = (folder:string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

const copyFolder = (folder:string, destination:string) => {
  fs.cpSync(folder, destination, { recursive: true })
}

const ToUpperFirstLetter = (text = '') => text.charAt(0).toUpperCase() + text.slice(1);


export { createFolder, copyFolder, ToUpperFirstLetter }