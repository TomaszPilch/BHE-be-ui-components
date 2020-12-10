import { ExecException } from 'child_process'
const { exec } = require('child_process')

const runCommand = (cmd: string) => {
  exec(cmd, (e: ExecException, stdout: string, stderr: string) => {
    console.log(e)
    console.log(stdout)
    console.log(stderr)
  })
}

runCommand('yarn link react')
runCommand('yarn link react-redux')
runCommand('yarn link next')
runCommand('yarn link')
