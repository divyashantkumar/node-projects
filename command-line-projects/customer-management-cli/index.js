const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
        return conn;
    } catch (err) {
        console.error(err);
        process.exit(1);    // exit with failure
    }
}
const db = connectDB();


// import Customer Model
const Customer = require('./models/customer');

// Add Customer Function
const addCustomer = (customer) => {
    Customer.create(customer).then((customer) => {
        console.info("New Customer Added: ", customer);
        // db.close();
    })
}

// Find Customer Function
const findCustomer = (name) => {
    // make case insensitive
    const search = new RegExp(name, 'i');

    Customer.findOne({$or: [{firstname: search}, {lastname: search}]}).then((customer) => {
        if (customer) {
            console.info(customer);
            console.info(`${customer.length} Customers Found`);
        } else {
            console.info("Customer Not Found");
        }
        // db.close();
    })
}

module.exports = {
    addCustomer,
    findCustomer
}
