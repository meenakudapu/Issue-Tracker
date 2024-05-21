const issueModel = require('../Model/IssueModel');
const statusModel = require('../Model/StatusModel');
const { v4: uuidv4 } = require('uuid');
const MappingModel = require('../Model/MappingModel');

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
        const { issueId } = req.params;
        const issue = await issueModel.findOne({ issueId: issueId });
        if (!issue) {
            res.status(404).send(`Issue with ID: ${issueId} not found`);
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
        const { issueId } = req.params;
        const issue = await issueModel.deleteOne({ issueId: issueId });
        if (issue.deletedCount == 0) {
            res.status(404).send(`Issue with ID: ${issueId} not found`);
        } else {
            res.status(200).json({ message: `Issue with ID : ${issueId} deleted successfully` });
        }
        await MappingModel.deleteOne({issueId:issueId})
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting the issue");
    }
}


async function IssueSave(req, res) {
    try {
        const { issueId, imageUrl, issueName, issueDesc, createdOn, createdBy, connectedBy, status } = req.body;


        const existingIssue = await issueModel.findOne({ issueId });

        if (existingIssue) {
            return res.status(400).send('Issue ID already exists');
        }

        if (status !== 'open' && status !== 'closed') {
            return res.status(400).send('Status must be either "open" or "closed"');
        }

        
        const statusId = uuidv4();

       
        await MappingModel.create({ issueId, statusId, status });

        const issue = await issueModel.create({
            issueId,
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
        const { issueId } = req.params;
        const { status } = req.body;

        if (status && status !== 'open' && status !== 'closed') {
            return res.status(400).send('Status must be either "open" or "closed"');
        }

        const updatedIssue = await issueModel.findOneAndUpdate(
            { issueId: issueId },
            req.body,
            { new: true }
        );
        if (!updatedIssue) {
            res.status(404).send(`Issue with ID: ${issueId} not found`);
        } else {
            res.status(200).json(updatedIssue);
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
