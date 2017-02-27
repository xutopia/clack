import chalk from 'chalk'
import mongo from './mongo'

export default () => {
  const y = chalk.yellow.bind(chalk)
  console.log(y(`Using ${chalk.red('MongoDB')}`));
  return mongo()
}
