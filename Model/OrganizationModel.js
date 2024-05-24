const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgId: { type: String, unique: true },
    orgEmail: { type: String },
    serviceIds: [{ type: String }],
    orgPassword: { type: String },
    orgName: { type: String },
    orgIssueId:[{type:String}], 
    empIds:[{ type: String }]
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
