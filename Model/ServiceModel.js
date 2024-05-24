const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    sId: { type: String, required: true },
    sEmail: { type: String },
    sPhno: { type: String },
    sOrgId: { type: String, required: true },
    sEmpIds: [{ type: String }], 
    sIssueIds: [{ type: String }] 
});

const ServicesModel = mongoose.model('Services', servicesSchema);

module.exports = ServicesModel;
