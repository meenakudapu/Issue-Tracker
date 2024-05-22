

const StatusModel = require('../Model/StatusModel');
const MappingModel = require('../Model/MappingModel');

exports.mapIssue = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { statusDescription}=req.body;
       
        const statusDoc = await MappingModel.findOne({ issueId });

        if (statusDoc) {
            const { status, statusId } = statusDoc;
            const mapping = await StatusModel.create({ issueId, status ,statusId,statusDescription });
            res.status(201).json(mapping);
        } else {
            res.status(404).send(`Status not found for issue ID: ${issueId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to map issue with status');
    }
};
exports.showOpenStatus = async (req, res) => {
    try {
        const openStatus = await StatusModel.find({ status: 'open' });
        res.status(200).json(openStatus);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve open status');
    }
};

exports.showClosedStatus = async (req, res) => {
    try {
        const closedStatus = await StatusModel.find({ status: 'closed' });
        res.status(200).json(closedStatus);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to retrieve closed status');
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const { issueId } = req.params;
        const { status, statusDescription } = req.body;

        const filter = { issueId: issueId }; 
        const update = { status: status, statusDescription: statusDescription }; 

        const updatedStatus = await StatusModel.findOneAndUpdate(filter, update, { new: true });

        if (updatedStatus) {
            res.status(200).json(updatedStatus);
        } else {
            res.status(404).send(`Status with issue ID: ${issueId} not found`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update status');
    }
};
