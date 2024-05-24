const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Employee = require('../Model/EmployeeModel'); 
const Organization=require('../Model/OrganizationModel')
const Service=require('../Model/ServiceModel');

const mongoURI = 'mongodb://localhost:27017/issue_tracker'; 

async function addEmployee(req, res) {
    try {
        const { empName, empPassword, empPhno, taskCount ,empOrgId,empServiceId} = req.body;
        const documentCount = await Employee.countDocuments();
        const empId = 200 + documentCount + 1;
        // const employee = await Employee.create({
        //     empId,
        //     empName,
        //     empPassword,
        //     empPhno,
        //     taskCount,
        //     empOrgId,
        //     empServiceId
        // });
        // const organization = await Organization.findOne({ orgId: empOrgId });
        // if (organization) {
        //     organization.empIds.push(empId);
        //     await organization.save();
        // }
        // const service = await Service.findOne({ sId:empServiceId});
        // if (service) {
        //     service.sEmpIds.push(empId);
        //     await service.save();
        // }
        const organization = await Organization.findOne({ orgId: empOrgId });
        const service = await Service.findOne({ sId: empServiceId, sOrgId: empOrgId });

        if (!organization) {
            return res.status(400).send('Organization does not exist');
        }

        if (!service) {
            return res.status(400).send('Service does not belong to the organization');
        }

        const employee = await Employee.create({
            empId,
            empName,
            empPassword,
            empPhno,
            taskCount,
            empOrgId,
            empServiceId
        });

        organization.empIds.push(empId);
        await organization.save();

        service.sEmpIds.push(empId);
        await service.save();
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while creating employee');
    }
}

async function getEmployees(req, res) {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server failed to fetch employees");
    }
}

async function deleteEmployee(req, res) {
    try {
        const { empId } = req.params;
        const result = await Employee.deleteOne({ empId });
        if (result.deletedCount === 0) {
            res.status(404).send(`Employee with ID: ${empId} not found`);
        } else {
            res.status(200).json({ message: `Employee with ID: ${empId} deleted successfully` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting the employee");
    }
}

async function editEmployee(req, res) {
    try {
        const { empId } = req.params;
        const updatedEmployee = await Employee.findOneAndUpdate(
            { empId },
            req.body,
            { new: true }
        );
        if (!updatedEmployee) {
            res.status(404).send(`Employee with ID: ${empId} not found`);
        } else {
            res.status(200).json(updatedEmployee);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating the employee");
    }
}

module.exports={
    addEmployee,
    getEmployees,deleteEmployee,editEmployee
};