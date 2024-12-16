#!/usr/bin/env node


const states = require('../util/states');
const districts = require('../util/district');
const slots = require('../util/slots');

const { Command } = require('commander');
const inquirer = require('inquirer');
const readline = require('readline');
const notifier = require('node-notifier');


const program = new Command();
const prompt = inquirer.createPromptModule();



program
    .version('1.0.0')
    .description("Covid-19 Vaccination Slot Tracker");

program
    .command("states")
    .alias("s")
    .description("States list")
    .action(() => {
        states.getStates();
        notifier.notify({
            title: 'States List',
            icon: 'success',
            subtitle: 'Success',
            message: 'States list has been loaded successfully',
            sound: true,            
        });
    });

const questions = [
    {
        type: 'input',
        name: 'state_id',
        message: 'Please enter the state ID',
    }
];
program
    .command("districts")
    .alias("d")
    .description("Districts list of a state")
    .action(() => {
        prompt(questions).then((answers) => {
            /**
             * Asynchronously loads the `cli-spinners` ES module and displays a random spinner animation
             * in the console. The spinner runs for a set duration (e.g., 2 seconds) before stopping 
             * and printing "Done!" to indicate completion.
             */
            async function loadESModule() {
                const cliSpinners = await import('cli-spinners');
                const spinner = cliSpinners.default.line;
                let i = 0;
                // Print the spinner animation 
                const interval = setInterval(() => {
                    const { frames } = spinner;
                    readline.cursorTo(process.stdout, 0);
                    process.stdout.write(frames[i = ++i % frames.length] + ' Loading...');
                }, spinner.interval);

                // Stop the spinner after a set amount of time (e.g., 5 seconds) 
                setTimeout(() => {
                    clearInterval(interval);
                    readline.cursorTo(process.stdout, 0);
                }, 2000);
            }
            loadESModule();

            setTimeout(() => {
                console.log('');
                console.log('Done!');
                districts.getDistricts(answers.state_id);
            }, 2000);
        });
    });


program
    .command("slots")
    .alias("sl")
    .description("Districts list of a state")
    .action(() => {
        slots.getSlots();
    });


program
    .parse(process.argv);


// states.getStates()
// districts.getDistricts(34)

/*
    // Since curretly there is no slot and vaccination goin on, we will use 02-05-2022 or dates during which vaccination was going on
    const date = new Date('02-05-2022'); // mm-dd-yyyy
    slots.getSlots(654, date);

*/


