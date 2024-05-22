const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    s_id: { type: String, required: true },
    s_email: { type: String },
    s_phno: { type: String },
    s_org_id: { type: String, required: true },
    s_emp_ids: [{ type: String }], // Array of employee IDs associated with the service
    s_issue_ids: [{ type: String }] // Array of issue IDs associated with the service
});

const ServicesModel = mongoose.model('Services', servicesSchema);

module.exports = ServicesModel;
