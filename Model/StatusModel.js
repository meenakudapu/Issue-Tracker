const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
    issueId: { type: String, required: true },
    statusId: { type: String, required: true },
    status: { type: String,
        enum: ['open', 'closed', 'notopened'],
        default: 'notopened'
    },
     
    statusDescription: { type: String }
});

const StatusModel = mongoose.model('Status', statusSchema);

module.exports = StatusModel;