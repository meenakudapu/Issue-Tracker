const mongoose = require('mongoose');
const internal = require('stream');

// Define the schema for the issue
const issueSchema = new mongoose.Schema({
    issueId: { type:String, required: true,unique: true },
    imageUrl: { type: String },
    issueName: { type: String, required: true },
    issueDesc: { type: String },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    connectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    status: { 
        type: String, 
        required: true,
        ref:'StatusModel',
        enum: ['open', 'closed'] 
    }
});


const IssueModel = mongoose.model('Issue', issueSchema);
issueSchema.set('primaryKey', 'issueId');
module.exports = IssueModel