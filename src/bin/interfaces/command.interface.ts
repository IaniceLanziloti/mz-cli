type functionCommand = () => void;

interface ICommand {
  title?:string;
  location: string;
  executor: 'FileSystem' | 'Function' | 'Git' | 'Yarn';
  params: string[] | functionCommand;
}

export { ICommand }