import fs from 'fs'
import path from 'path';

const getSourceRoot = () => {
  const basePath = process.cwd();
  const relativePaths:string[] = [];

  let relativePath:string;
  let recursiveCount = 0;
  let maxAttempts = 5;
  let pathExists = false;

  do {
    relativePath = path.resolve(basePath, ...relativePaths);
    
    const dirFiles = fs.readdirSync(relativePath);
    
    pathExists = dirFiles.some(file=>file.includes("mz-cli.json"));
    
    recursiveCount += 1;
    relativePaths.push('..');
    
  } while (!pathExists && recursiveCount < maxAttempts )

  if (!pathExists) {
    throw new Error("Configuration file mz-cli.json not found")
  }

  relativePaths.pop();

  const configurationFile = fs.readFileSync(path.resolve(relativePath,'mz-cli.json'));
  const configuration = JSON.parse(configurationFile.toString());

  return path.resolve(relativePath, configuration.rootDir)
}

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

const createFolder = (folder:string) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true })
  }
}

const copyFolder = (folder:string, destination:string) => {
  fs.cpSync(folder, destination, { recursive: true })
}

const ToUpperFirstLetter = (text = '') => text.charAt(0).toUpperCase() + text.slice(1);


export { createConfigurationFile, createFolder, copyFolder, ToUpperFirstLetter, getSourceRoot }