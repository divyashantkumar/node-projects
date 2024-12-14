const { Command } = require('commander');

const {
    addCustomer,
    findCustomer
} = require('./index');





const program = new Command();

program.
    version("1.0.0").
    description("Customer Management CLI");

program.
    command("add <firstname> <lastname> <email> <phone> <address>").
    alias("a").
    description("Add a new customer Details, firstname, lastname, email, phone, address").
    action((firstname, lastname, email, phone, address) => {
        addCustomer({firstname, lastname, email, phone, address});
    });

program.
    command("find <name>").
    alias("f").
    description("Find customer by name").
    action(name => {
        findCustomer(name);
    });

program.parse(process.argv);