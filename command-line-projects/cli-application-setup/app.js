#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program.
    version("1.0.0").
    description("First CLI applicaiton setup with commander package");

program.
    command("greet <name>").
    description("Greet the user with the given name in the command argument").
    action(name => console.log(`Hello ${name}`));

    

program.parse(process.argv);

