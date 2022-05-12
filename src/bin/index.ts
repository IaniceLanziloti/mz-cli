#! /usr/bin/env node
import yargs from 'yargs'

import { createApplication, createDomain, createResource } from './functions'

(async function handle() {
  const usageMessage = `Use mz-cli to create domains and resources into your application`

  const options: { [key: string]: yargs.Options } = {
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

  const _yargs = yargs(process.argv.slice(2))
    .options(options)
    .usage(usageMessage)
    .help(true);

  const argv = await _yargs.argv;

  if (argv.application) {
    createApplication(argv.application as string)
  }

  if (argv.domain) {
    createDomain(argv.domain as string);
  }

  if (argv.resource) {
    createResource(argv.resource as string)
  }

  const receivedParam = Object.keys(argv).some(key => Object.keys(options).includes(key))

  if (!receivedParam) {
    return _yargs.showHelp()
  }
})()