const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const IssueModel = require('./Model/IssueModel');
const issueController = require('./Controller/IssueController');


const StatusModel = require('./Model/StatusModel');
const statusController = require('./Controller/StatusController');

const EmployeeModel =require('./Model/EmployeeModel');
const EmployeeController=require('./Controller/EmployeeController');

const ServiceModel = require('./Model/ServiceModel');
const ServiceController = require('./Controller/ServiceController');

const OrganizationModel = require('./Model/OrganizationModel');
const OrganizationController = require('./Controller/OrganizationController');

const app = express();
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 2000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/issue_tracker');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
//Status
//app.post('/api/status/:issueId',statusController.mapIssue)
app.get('/api/status/openStatus',statusController.showOpenStatus);
app.get('/api/status/closedStatus',statusController.showClosedStatus);
app.put('/api/status/:issueId',statusController.updateStatus);
app.get('/api/status',statusController.getStatus);

//Issues
app.get('/api/issues', issueController.getHomeIssues);
app.get('/api/issues/:issueId', issueController.IssueEditData);
app.post('/api/issues', issueController.IssueSave);
app.put('/api/issues/:issueId', issueController.IssueEditSave);
app.delete('/api/issues/:issueId', issueController.IssueDelete);

//Employee
app.get('/api/employee', EmployeeController.getEmployees);
app.post('/api/employee', EmployeeController.addEmployee);
app.put('/api/employee/:emp_id',EmployeeController.editEmployee );
app.delete('/api/employee/:emp_id',EmployeeController.deleteEmployee);

//Services
app.get('/api/service', ServiceController.getServices);
app.post('/api/service', ServiceController .addService);
app.put('/api/service/:sId',ServiceController.editService );
app.delete('/api/service/:sId',ServiceController.deleteService );

//Organizations
app.post('/api/organization',OrganizationController.addOrganization);
app.get('/api/organization', OrganizationController.getOrganizations);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});