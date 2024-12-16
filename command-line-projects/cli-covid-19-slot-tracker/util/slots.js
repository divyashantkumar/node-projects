const axios = require('axios');
const Table = require('tty-table');
const chalk = require('chalk');
const inquirer = require('inquirer');
const notifier = require('node-notifier');

const { ttyTableCentersHeader, ttyTableOptions } = require('../util/config');

const prompt = inquirer.createPromptModule();
const questions = [
    {
        type: 'input',
        name: 'district_id',
        message: 'Please enter the district ID',
        validate: (input) => {
            if (input) {
                return true;
            }
            return 'Please enter the district ID';
        }
    },
    {
        type: 'input',
        name: 'day',
        message: 'Please enter the day',
        validate: (input) => {
            if (input) {
                return true;
            }
            return 'Please enter the day';
        }
    },
    {
        type: 'input',
        name: 'month',
        message: 'Please enter the month',
        validate: (input) => {
            if (input) {
                return true;
            }
            return 'Please enter the Month';
        }
    },
    {
        type: 'list',
        name: 'year',
        message: 'Please choose the Year',
        choices: [
            {
                name: '2019',
                value: '2019'
            },
            {
                name: '2020',
                value: '2020'
            },
            {
                name: '2021',
                value: '2021'
            },
            {
                name: '2022',
                value: '2022'
            },
            {
                name: '2023',
                value: '2023'
            }
        ]
    },
    {
        type: 'list',
        name: 'age',
        message: 'Please choose age limit',
        choices: [
            {
                name: 'all age',
                value: ''
            },
            {
                name: '12+',
                value: '12'
            },
            {
                name: '45+',
                value: '45'
            }   
        ]
    }
];

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and add leading zero
    const year = date.getFullYear(); // Get year

    return `${month}-${day}-${year}`;
};

function filterAge(data, age) {
    if(!age) {
        return true;
    }
    if (data.age >= age) {
        return true;
    } else {
        return false;
    }
}

// async function getSlots(district_id, date) {
async function getSlots() {
    try {
        const answers = await prompt(questions);
        const date = new Date(`${answers.month}-${answers.day}-${answers.year}`);
        const district_id = answers.district_id;

        const mmddyyy = formatDate(date);
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${mmddyyy}`;

        const response = await axios.get(url);

        const finalData = [];
        response.data?.centers?.forEach(center => {

            center?.sessions?.forEach(session => {
                const outputData = {
                    name: center.name,
                    address: center.address,
                    available: session.available_capacity,
                    age: session.min_age_limit,
                    date: session.date,
                }
                filterAge(outputData, answers.age)  ? finalData.push(outputData) : null;                
            })
        });

        let output = Table(ttyTableCentersHeader, finalData || [], ttyTableOptions).render();

        const options = { day: 'numeric', month: 'long', year: 'numeric' };

        console.log()
        console.log(chalk.underline.yellowBright(date.toLocaleDateString('en-US', options)));

        if (finalData.length === 0) {
            console.log(chalk.red(`No slots found for selected location and date [${date.toLocaleDateString('en-US', options)}]`));
        }

        console.log(output)

        notifier.notify({
            title: 'Slots found',
            subtitle: 'Covid-19 Vaccination Slot Tracker',
            message: `Slots found for selected location and date [${date.toLocaleDateString('en-US', options)}]`,
            sound: true,
            wait: true
        });

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getSlots
};    