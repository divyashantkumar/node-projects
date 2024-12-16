const axios = require('axios');
const Table = require('tty-table');
const { ttyTableDistrictHeader, ttyTableOptions } = require('../util/config');

async function getDistricts(state_id) {
    try {
        const url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`;
    
        const response = await axios.get(url,{});
    
        let output = Table(ttyTableDistrictHeader, response.data.districts, ttyTableOptions).render();
    
        console.log(output)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    getDistricts
};