const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    taskCount: { type: Number, default: 0 }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
