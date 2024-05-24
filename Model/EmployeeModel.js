const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    empId: { type: String, unique: true },
    empName: { type: String, required: true},
    empPassword: { type: String, required: true},
    empPhno: { type: String, required: true },
    empStatus: { type: String },
    empServiceId: { type: String },
    empOrgId: { type: String },
    empIssueId:[{ type: String }] ,
    taskCount: { type: Number, default: 0 }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
