import fs from 'fs'
import { Command } from 'commander/esm.mjs'
import shell from 'shelljs'
import ora from 'ora'
import chalk from 'chalk'

const program = new Command()
try {
  const pkg = JSON.parse(fs.readFileSync('../package.json', 'utf8'))
  program.version(pkg.version)
} catch (error) {
  console.error(chalk.red('%s'), error)
}

const spinner = ora({
  text: 'Loading',
  spinner: 'smiley'
})

export function cli(args) {
  // program
  //   .option('-d, --debug', 'output extra debugging')
  //   .option('-s, --small', 'small pizza size')
  //   .option('-p, --pizza-type <type>', 'flavour of pizza')

  const options = program.opts()

  program
    .command('clone <source>')
    .description('clone a repository into a newly created directory')
    .option(
      '-b, --branch <branch>',
      `checkout <branch> instead of the remote's HEAD`
    )
    .option(
      '-o, --origin <name>',
      `use <name> instead of 'origin' to track upstream`
    )
    .action(async (source, options) => {
      const mirrorUrl = source.replace(/github.com/, 'github.com.cnpmjs.org')
      let args = Object.entries(options)
        .map(([key, value]) => {
          return `--${key} ${value}`
        })
        .join(' ')
      console.log(chalk.green('%s'), `git clone ${mirrorUrl} ${args}`)
      spinner.start()
      const res = shell.exec(`git clone  ${mirrorUrl} ${args}`)
      if (res.code != 0) {
        spinner.fail()
        console.log(chalk.bgRed('EXEC ERROR!'))
        return
      }
      spinner.succeed()
    })

  program.parse(args)
}

export function main() {
  cli(process.argv)
}

main()
