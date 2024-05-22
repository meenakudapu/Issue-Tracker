const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Employee = require('../Model/EmployeeModel'); // Adjust the path as needed


const mongoURI = 'mongodb://localhost:27017/issue_tracker'; 


mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');

       
        // const filePath = path.join(__dirname, 'Employee.json');
        // const employees = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const employees=[
            { "employeeId": "emp001", "taskCount": 2 },
            { "employeeId": "emp002", "taskCount": 1 },
            { "employeeId": "emp003", "taskCount": 3 },
            { "employeeId": "emp004", "taskCount": 0 },
            { "employeeId": "emp005", "taskCount": 4 },
            { "employeeId": "emp006", "taskCount": 4 },
            { "employeeId": "emp007", "taskCount": 2 }
        ]
        const employee=[{ "employeeId": "emp008", "taskCount": 2 }]
        return Employee.insertMany(employee);
    })
    .then(() => {
        console.log('Employees inserted');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('Error inserting employees:', err);
        mongoose.disconnect();
    });
