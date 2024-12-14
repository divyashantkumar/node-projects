const mongoose = require('mongoose');
const dotenv = require('dotenv');
// import Customer Model
const Customer = require('./models/customer');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/customercli");
        console.log('MongoDB Connected');
        return conn;
    } catch (err) {
        console.error(err);
        process.exit(1);    // exit with failure
    }
}
const db = connectDB();

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

    Customer.findOne({ $or: [{ firstname: search }, { lastname: search }] }).then((customer) => {
        if (customer) {
            console.info(customer);
            console.info(`${customer.length} Customers Found`);
        } else {
            console.info("Customer Not Found");
        }
        // db.close();
    })
}

// Update customer function
const updateCustomer = (_id, customer) => {
    Customer.updateOne({ _id }, customer).then((customer) => {
        console.log("Customer Updated : ", customer);
    })
}

// Delete customer function
const deleteCustomer = (_id) => {
    Customer.deleteOne({ _id }).then((customer) => {
        console.log("Customer Deleted : ", customer);
    })
}

// List all customers function
const listCustomers = () => {
    Customer.find().then((customers) => {
        console.log("Number of Customers: ", customers.length);
        customers.forEach((customer) => {
            console.info(customer);
        })
    })
}

module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomers
}
