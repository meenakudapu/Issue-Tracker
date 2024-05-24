const mongoose = require('mongoose');
const { type } = require('os');
const internal = require('stream');

const issueSchema = new mongoose.Schema({
    issueId: { type:String, required: true,unique: true },
    imageUrl: { type: String },
    issueName: { type: String, required: true },
    issueDesc: { type: String },
    createdOn: { type: Date, default: Date.now },
    createdBy: {type:String},
    status: {type: String}, 
    connectedTo:{ type: String},
    issueStatusId:{type:String},
    issueServiceId:{type:String},
    issueOrgId:{type:String}
});


const IssueModel = mongoose.model('Issue', issueSchema);
issueSchema.set('primaryKey', 'issueId');
module.exports = IssueModel