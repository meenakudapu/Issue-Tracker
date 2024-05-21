const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const IssueModel = require('./Model/IssueModel');
const issueController = require('./Controller/IssueController');


const StatusModel = require('./Model/StatusModel');
const statusController = require('./Controller/StatusController');


const app = express();
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/issue_tracker');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.post('/admin/mapIssue/:issueId',statusController.mapIssue)
app.get('/admin/openStatus',statusController.showOpenStatus);
app.get('/admin/closedStatus',statusController.showClosedStatus);
app.put('/status/:issueId',statusController.updateStatus)


app.get('/api/issues', issueController.getHomeIssues);
app.get('/api/issues/:issueId', issueController.IssueEditData);
app.post('/api/issues', issueController.IssueSave);
app.put('/api/issues/:issueId', issueController.IssueEditSave);
app.delete('/api/issues/:issueId', issueController.IssueDelete);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});