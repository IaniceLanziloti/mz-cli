#! /usr/bin/env node
import yargs, { Arguments }  from 'yargs'

import { createApplication, createDomain, createResource } from './functions'
import IArgsOptions from './interfaces/IArgsOptions'
import ICLIArgs from './interfaces/ICLIArgs'

(function handle() {

  const options: IArgsOptions = {
    'application': {
      alias: 'a',
      describe: 'create an application',
      type: 'string'
    },
    'domain': {
      alias: 'd',
      describe: 'create a domain',
      type: 'string'
    },
    'resource': {
      alias: 'r',
      describe: 'create a resouce',
      type: 'string'
    }
  }

  const usageMessage = `Use mz-cli to create domains and resources into your application`

  const _yargs = yargs(process.argv.slice(2))
    .options(options)
    .usage(usageMessage)
    .help(true);

  const argv = _yargs.argv as Arguments<ICLIArgs>

  if (argv.application) {
    createApplication(argv.application)
  }

  if (argv.domain) {
    createDomain(argv.domain);
  }

  if (argv.resource) {
    createResource(argv.resource)
  }

  const receivedParam = Object.keys(argv).some(key => Object.keys(options).includes(key))

  if (!receivedParam) {
    return _yargs.showHelp()
  }
})()