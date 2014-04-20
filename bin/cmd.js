#!/usr/bin/env node

var quote = require('../');
process.stdin.pipe(quote()).pipe(process.stdout);
