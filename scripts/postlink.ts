import { ExecException } from 'child_process'
const { exec } = require('child_process')

const runCommand = (cmd: string) => {
  exec(cmd, (e: ExecException, stdout: string, stderr: string) => {
    console.log(e)
    console.log(stdout)
    console.log(stderr)
  })
}

runCommand('yarn unlink react')
runCommand('yarn unlink react-dom')
runCommand('yarn unlink react-redux')
runCommand('yarn unlink next')
runCommand('yarn unlink @fluentui/react')
runCommand('yarn unlink @uifabric/experiments')
runCommand('yarn unlink office-ui-fabric-core')
runCommand('yarn unlink office-ui-fabric-react')
runCommand('yarn unlink')
