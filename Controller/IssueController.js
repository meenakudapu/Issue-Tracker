const issueModel = require('../Model/IssueModel');
const statusModel = require('../Model/StatusModel');
const { v4: uuidv4 } = require('uuid');
const MappingModel = require('../Model/MappingModel');
const EmployeeModel = require('../Model/EmployeeModel');
const Organization=require('../Model/OrganizationModel')
const Service=require('../Model/ServiceModel')
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
        const { imageUrl, issueName, issueDesc, createdOn, createdBy, connectedBy, status ,issueOrgId, issueServiceId } = req.body;

        // Generate a unique statusId
        const statusId = 3000 + (await statusModel.countDocuments()) + 1;

        // Find an employee with less than 4 tasks
        const employee = await EmployeeModel.findOne({ taskCount: { $lt: 6 } ,empOrgId:issueOrgId,empServiceId:issueServiceId});
        if (!employee) {
            return res.status(400).send('No available employee with less than 6 tasks');
        }

        // Create a new issue document
        const newIssueId =5000 + (await issueModel.countDocuments()) + 1;
        const issue = await issueModel.create({
            issueId: newIssueId,
            imageUrl,
            issueName,
            issueDesc,
            createdOn,
            createdBy,
            connectedBy,
            connectedTo: employee.empId,
            status: 'notopened', 
            issueStatusId: statusId,
            issueOrgId: issueOrgId, 
            issueServiceId: issueServiceId

        });

        const organization = await Organization.findOne({ orgId: issueOrgId });
        if (organization) {
            organization.orgIssueId.push(newIssueId);
            await organization.save();
        
        }
        const service = await Service.findOne({ sId:issueServiceId});
        if (service) {
            service.sIssueIds.push(newIssueId);
            await service.save();
        
        }
        await statusModel.create({
            issueId: newIssueId,
            statusId,
            status
        });

       
        await EmployeeModel.updateOne(
            { empId: employee.empId },
            { $push: { empIssueId: newIssueId }, $inc: { taskCount: 1 } }
        );

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
