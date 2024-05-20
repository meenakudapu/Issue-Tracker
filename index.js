const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//const UserModel = require('./Model/UserModel');

const IssueModel = require('./Model/IssueModel');
//const userController = require('./Controller/UserController');
const issueController = require('./Controller/IssueController');

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




// app.get('/api/users', userController.getUsers);
// app.get('/api/users/:userId', userController.userDataById);
// app.post('/api/users', userController.userSave);
// app.put('/api/users/:userId', userController.userEditSave);
// app.delete('/api/users/:userId', userController.userDelete);


app.get('/api/issues', issueController.getHomeIssues);
app.get('/api/issues/:issueId', issueController.IssueEditData);
app.post('/api/issues', issueController.IssueSave);
app.put('/api/issues/:issueId', issueController.IssueEditSave);
app.delete('/api/issues/:issueId', issueController.IssueDelete);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
