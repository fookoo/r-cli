#! /usr/bin/env node

import chalk from 'chalk'
import { generateComponent } from './templates/component.js'
import { generateHook } from "./templates/hook.js";
import { generatePage } from "./templates/page.js";
import { generateService } from "./templates/service.js";

const info = (...msg) => console.log(chalk.white(...msg))
const secondary = (...msg) => console.log(chalk.grey(...msg))
const [,,command,name,...rest] = process.argv
const force = rest.includes('--force')

switch(command) {
    case 'c':
    case 'component':
        info('Generating component', chalk.yellow(name))
        generateComponent(name, force)
        break;
    case 'h':
    case 'hook':
        info('Generating hook', chalk.yellow(name))
        generateHook(name, force)
        break;
    case 'p':
    case 'page':
        info('Generating page', chalk.yellow(name))
        generatePage(name, force)
        break;
    case 's':
    case 'service':
        info('Generating service', chalk.yellow(name))
        generateService(name, force)
        break;
    case 'help':
    default:
        info('React structure generator')
        secondary(chalk.yellow('r-cli'), 'component ComponentName')
        secondary(chalk.yellow('r-cli'), 'hook MyHook')
        secondary(chalk.yellow('r-cli'), 'page Home')
        secondary(chalk.yellow('r-cli'), 'service Users')
        break;
}
