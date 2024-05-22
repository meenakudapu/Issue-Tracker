const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Service = require('../Model/ServiceModel'); // Adjust the path as needed

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/issue_tracker'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('MongoDB connected');

        try {
            // Data to insert into the services collection
            const services = [
                { 
                    "s_id": "s001", 
                    "s_email": "service1@example.com", 
                    "s_phno": "1234567890", 
                    "s_org_id": "org001",
                    "s_emp_ids": ["emp001", "emp002"],
                    // "s_issue_ids": ["issue001", "issue002"]
                },
                { 
                    "s_id": "s002", 
                    "s_email": "service2@example.com", 
                    "s_phno": "9876543210", 
                    "s_org_id": "org002",
                    "s_emp_ids": ["emp003", "emp004"],
                    // "s_issue_ids": ["issue003", "issue004"]
                },
                { 
                    "s_id": "s003", 
                    "s_email": "service3@example.com", 
                    "s_phno": "988887877", 
                    "s_org_id": "org003",
                    "s_emp_ids": ["emp005", "emp006"],
                    // "s_issue_ids": ["issue003", "issue004"]
                },
                { 
                    "s_id": "s004", 
                    "s_email": "service4@example.com", 
                    "s_phno": "9999999999", 
                    "s_org_id": "org004",
                    "s_emp_ids": ["emp007", "emp008"],
                    // "s_issue_ids": ["issue003", "issue004"]
                },
                { 
                    "s_id": "s005", 
                    "s_email": "service4@example.com", 
                    "s_phno": "9999999999", 
                    "s_org_id": "org004",
                    "s_emp_ids": ["emp007", "emp008"],
                    // "s_issue_ids": ["issue003", "issue004"]
                }
            ];

            // Insert the services into the MongoDB collection
            await Service.insertMany(services);
            console.log('Services inserted');
        } catch (err) {
            console.error('Error inserting services:', err);
        } finally {
            // Disconnect from MongoDB after insertion
            mongoose.disconnect();
        }
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
