const mongoose = require('mongoose');

// Define the schema for the issue
const issueSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    imageUrl: { type: String },
    issueName: { type: String, required: true },
    issueDesc: { type: String },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    connectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true }
});

// Create the IssueModel using the schema
const IssueModel = mongoose.model('Issue', issueSchema);
issueSchema.set('primaryKey', 'issueId');
module.exports = IssueModel