interface IExecutorRunParameters {
  location: string;
  command: any;
}

interface IExecutor {
  exec(location: string, params: string[] | any ):void;
}

export { IExecutor, IExecutorRunParameters }