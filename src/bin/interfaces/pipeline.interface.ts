import { ICommand } from './command.interface'

interface IPipeline {
  title: string;
  commands: ICommand[]
}

export { IPipeline }