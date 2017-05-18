/* eslint-disable unicorn/no-process-exit */
import cac from 'cac'
import chalk from 'chalk'
import update from 'update-notifier'
import bili from './bili'

const cli = cac()

update({ pkg: cli.pkg }).notify()

cli
  .option('config, c', 'Path to config file', 'bili.config.js')
  .option('watch, w', 'Run in watch mode')
  .option('name, n', 'The filename of output file, no extension')
  .option('out-dir, d', 'The output directory', 'dist')
  .option('format', 'Bundle format, array of string', 'cjs')
  .option('module-name', 'The module name for UMD builds')
  .option('map', 'Generate sourcemap, boolean or `inline`', false)
  .option('compress', 'Generate a UMD bundle and compress it with sourcemaps')
  .option('skip', 'Exclude specfic modules in node_modules dir from bundled file')
  .option('es-module', 'Respect `jsnext:main` and `module` field in package.json', true)
  .option('browser', 'Respect `browser` field in package.json', false)
  .option('alias', 'Set option for rollup-plugin-alias')
  .option('replace', 'Set option for rollup-plugin-replace')
  .option('flow', 'Remove flow type annotations', false)
  .option('exports', 'Specific what export mode to use, `default` or `named`')
  .option('resolve', 'Resolve external dependencies', false)

cli.command('*', 'Bundle with bili', (input, flags) => {
  const options = Object.assign({
    entry: input[0]
  }, flags)

  return bili(options).catch(err => {
    console.log(err)
    if (err.snippet) {
      console.error(chalk.red(`---\n${err.snippet}\n---`))
    }
    console.error(err.message)
    process.exit(1) // eslint-disable-line xo/no-process-exit
  })
})

cli.parse()
