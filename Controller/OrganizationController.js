const Organization = require('../Model/OrganizationModel');
const Service = require('../Model/ServiceModel');

async function addOrganization(req, res) {
    try {
        const { orgId, orgEmail, orgName } = req.body;
        if (!orgId) {
            return res.status(400).send('Organization ID is required');
        }

        const existingOrganization = await Organization.findOne({ orgId });
        if (existingOrganization) {
            return res.status(400).send('Organization with this ID already exists');
        }

        const organization = await Organization.create({
            orgId,
            orgEmail,
            orgName
        });

        const services = await Service.find();
        for (const service of services) {
            if (service.sOrgId === orgId) {
                organization.serviceIds.push(service.sId);
            }
        }

        await organization.save();

        res.status(201).json(organization);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while creating organization');
    }
}

async function getOrganizations(req, res) {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve organizations');
    }
}

module.exports = {
    addOrganization,
    getOrganizations
};
