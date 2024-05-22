
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Organization = require('../Model/OrganizationModel');
const Service = require('../Model/ServiceModel');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/issue_tracker';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        try {
            // Data to insert into the organization collection
            const organizations = [
                { "org_id": "org001", "org_email": "org1@example.com", "org_name": "Organization 1" },
                { "org_id": "org002", "org_email": "org2@example.com", "org_name": "Organization 2" },
                { "org_id": "org003", "org_email": "org3@example.com", "org_name": "Organization 3" },
                { "org_id": "org004", "org_email": "org4@example.com", "org_name": "Organization 4" }
            ];

            await Organization.insertMany(organizations);
            console.log('Organizations inserted');

            // Retrieve services from MongoDB
            const services = await Service.find();

            // Map service IDs to corresponding organizations
            for (const service of services) {
                const organization = await Organization.findOne({ org_id: service.s_org_id });
                if (organization) {
                    organization.service_ids.push(service.s_id);
                    await organization.save();
                    console.log(`Service ID ${service.s_id} mapped to organization ID ${organization.org_id}`);
                } else {
                    console.log(`Organization not found for service ID ${service.s_id}`);
                }
            }
        } catch (err) {
            console.error('Error inserting organizations or mapping services:', err);
        } finally {
            // Disconnect from MongoDB after insertion and mapping
            mongoose.disconnect();
        }
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
