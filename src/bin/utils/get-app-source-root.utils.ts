import path from 'path'
import fs from 'fs';



const getAppSourceRoot = () => {
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

export { getAppSourceRoot }