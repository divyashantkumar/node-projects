const axios = require('axios');
const Table = require('tty-table');
const { ttyTableStatesHeader, ttyTableOptions } = require('../util/config');

async function getStates() {
    try {
        const url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
        const response = await axios.get(url);

        let output = Table(ttyTableStatesHeader, response.data.states, ttyTableOptions).render();

        console.log(output)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getStates
};