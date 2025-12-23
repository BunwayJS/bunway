#!/usr/bin/env bun

import { createCommand } from './commands/create';

const args = process.argv.slice(2);
const command = args[0];

if (command === 'create') {
    createCommand(args[1]);
} else if (command === 'serve') {
    console.log('serve command not yet implemented');
} else {
    console.log(`
Bunway CLI v0.1

Usage:
  bunway create <app-name>     Create a new Bunway application
  bunway serve                 Start development server

Examples:
  bunway create my-app
  bunway serve
  `);
}