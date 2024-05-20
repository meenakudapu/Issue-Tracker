const issueModel = require('../Model/IssueModel');


async function getHomeIssues(req, res) {
    try {
        const issues = await issueModel.find();
        res.status(200).json(issues);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server failed to fetch issues");
    }
}


async function IssueEditData(req, res) {
    try {
        const { id } = req.params;
        const issue = await issueModel.findById(id);
        if (!issue) {
            res.status(404).send(`Issue with ID: ${id} not found`);
        } else {
            res.status(200).json(issue);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching the issue");
    }
}


async function IssueDelete(req, res) {
    try {
        const { id } = req.params;
        const issue = await issueModel.findByIdAndDelete(id);
        if (!issue) {
            res.status(404).send(`Issue with ID: ${id} not found`); 
        } else {
            res.status(200).json(issue);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting the issue");
    }
}


async function IssueSave(req, res) {
    try {
        const { id, imageUrl, issueName, issueDesc, createdOn, createdBy, connectedBy, status } = req.body;
        const issue = await issueModel.create({
            _id: id,
            imageUrl,
            issueName,
            issueDesc,
            createdOn,
            createdBy,
            connectedBy,
            status
        });
        res.status(201).json(issue);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while creating the issue');
    }
}


async function IssueEditSave(req, res) { 
    try {
        const { id } = req.params;
        const issue = await issueModel.findByIdAndUpdate(id, req.body, { new: true }); 
        if (!issue) {
            res.status(404).send(`Issue with ID: ${id} not found`); 
        } else {
            res.status(200).json(issue);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating the issue");
    }
}

module.exports = {
    getHomeIssues,
    IssueEditData,
    IssueDelete,
    IssueSave,
    IssueEditSave 
};