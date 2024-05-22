const mongoose = require('mongoose');

// Define the schema for Organization
const organizationSchema = new mongoose.Schema({
    org_id: { type: String, required: true, unique: true },
    org_email: { type: String },
    service_ids: [{ type: String }], // Array to store service IDs
    org_password: { type: String },
    org_name: { type: String }
});

// Create and export the Organization model
const OrganizationModel = mongoose.model('Organization', organizationSchema);

module.exports = OrganizationModel;
