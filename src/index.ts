import chalk from 'chalk';
import * as yargs from 'yargs';

import { getConfig } from './config';
import { runLinter } from './linter';

const version = require('./../package.json').version;

yargs.version(version);
yargs.option('project', { default: './tsconfig.json', description: 'The tsc project to use.' });
const args = yargs.argv;

const config = getConfig();

const failuresFound = runLinter(config, args.project).report();

if (failuresFound) {
  console.log(chalk.red('\nPlease fix the above \'nglint\' failures.'));
  process.exit(1);
} else {
  console.log(chalk.green('No failures found by \'nglint\'.'));
}