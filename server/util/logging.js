import chalk from 'chalk'
import moment from 'moment'

// Helpers to make our console messages more useful.
export const log = console.log;

export const d = () => y(`[${moment().format('HH:mm:ss')}]`)

// normal style
export const g = chalk.green.bind(chalk);
export const b = chalk.blue.bind(chalk);
export const gr = chalk.grey.bind(chalk);
export const r = chalk.red.bind(chalk);
export const y = chalk.yellow.bind(chalk);

// bold
export const yb = chalk.yellow.bold.bind(chalk);
export const rb = chalk.red.bold.bind(chalk);

// combo
export const yellowRed = chalk.yellow.bgRed.bind(chalk);
export const blackWhite = chalk.white.bgBlack.bind(chalk);
