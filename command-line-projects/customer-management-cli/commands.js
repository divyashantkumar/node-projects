#!/usr/bin/env node

// Above line called "Shebang" makes the script executable from the command line. It is 
// standard practice to include this line at the top of executable node.js 
// scripts. See https://stackoverflow.com/a/13364275/1175496 for more details.


const { Command } = require('commander');
const enquirer = require('inquirer');

const {
    addCustomer,
    findCustomer,
    updateCustomer, 
    deleteCustomer,
    listCustomers
} = require('./index');


// Customer Question
const question = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Enter First Name: '
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Enter Last Name: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter Email: '
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Enter Phone: '
    },
    {
        type: 'input',
        name: 'address',
        message: 'Enter Address: '
    }
]


const program = new Command();
const prompt = enquirer.createPromptModule();

program.
    version("1.0.0").
    description("Customer Management CLI");

// WITHOUT USING INQUIRER
// program.
//     command("add <firstname> <lastname> <email> <phone> <address>").
//     alias("a").
//     description("Add a new customer Details, firstname, lastname, email, phone, address").
//     action((firstname, lastname, email, phone, address) => {
//         addCustomer({firstname, lastname, email, phone, address});
//     });


// USING INQUIRER
// Add Customer Command
program
    .command("add")
    .alias("a")
    .description("Add a new customer")
    .action(() => {
        
        prompt(question).then(answers => {
            addCustomer(answers);
        })
    });


// Find Customer Command
program.
    command("find <name>").
    alias("f").
    description("Find customer by name").
    action(name => {
        findCustomer(name);
    });


// Update Customer Command
program
    .command("update <_id>")
    .alias("u")
    .description("Update a customer")
    .action((_id) => {
        prompt(question).then(answers => {
            updateCustomer(_id, answers);
        })
    })

// delete Customer Command
program
    .command("delete <_id>")
    .alias("d")
    .description("Delete a customer")
    .action(_id => {
        deleteCustomer(_id);
    });


// List Customer Command
program
    .command("list")
    .alias("l")
    .description("List all customers")
    .action(() => {
        listCustomers();
    });


program.parse(process.argv);