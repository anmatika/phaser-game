#!/usr/bin/node

const {execSync} = require('child_process')

execSync('yarn start', {
  cwd: 'Frontend',
  stdio: 'inherit'
})
