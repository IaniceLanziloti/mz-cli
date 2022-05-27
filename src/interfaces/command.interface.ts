type functionCommand = () => void;

interface ICommand {
  title?:string;
  location: string;
  executor: 'FileSystem' | 'Function' | 'Git' | 'Yarn' | 'Schematics';
  params: string[] | functionCommand;
}

export { ICommand }