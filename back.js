#!/usr/bin/node
const {execSync} = require('child_process')

execSync('yarn start:dev', {
  cwd: 'Backend',
  stdio: 'inherit'
})
