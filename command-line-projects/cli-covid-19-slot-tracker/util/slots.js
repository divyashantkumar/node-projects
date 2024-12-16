const axios = require('axios');
const Table = require('tty-table');
const chalk = require('chalk');

const { ttyTableCentersHeader, ttyTableOptions } = require('../util/config');

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and add leading zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month and add leading zero
    const year = date.getFullYear(); // Get year

    return `${month}-${day}-${year}`;
};

async function getSlots(district_id, date) {
    try {
        const mmddyyy = formatDate(date);
        const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district_id}&date=${mmddyyy}`;

        const response = await axios.get(url);

        const finalData = [];
        response.data.centers.forEach(center => {

            center.sessions.forEach(session => {
                const outputData = {
                    name: center.name,
                    address: center.address,
                    available: session.available_capacity,
                    age: session.min_age_limit,
                    date: session.date,
                }

                finalData.push(outputData);
            })
        });

        let output = Table(ttyTableCentersHeader, finalData || [], ttyTableOptions).render();

        const options = { day: 'numeric', month: 'long', year: 'numeric' };

        console.log()
        console.log(chalk.underline.yellowBright(date.toLocaleDateString('en-US', options)));
        console.log(output)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getSlots
};    