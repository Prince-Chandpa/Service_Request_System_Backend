const { insert, getAll, getByID, updateStatus, getByStaffID } = require("../models/serviceRequest.model");
const { getRequestTypeByID } = require("./serviceRequestType.service");
const { getAllTypeWisePerson } = require("./serviceRequestTypeWisePerson.service");

async function createRequest(formData, UserID) {

    const requestType = await getRequestTypeByID(formData.ServiceRequestTypeID);

    if (!requestType || requestType.error) {
        return {
            error: true,
            message: "Invalid ServiceRequestTypeID"
        };
    }

    const typeWisePerson = await getAllTypeWisePerson();

    if (!typeWisePerson || typeWisePerson.error) {
        return {
            error: true,
            message: "No Type Wise Person Found"
        };
    }

    const assigned = typeWisePerson.data.find(
        p => p.ServiceRequestTypeID === formData.ServiceRequestTypeID
    );

    if (!assigned) {
        return {
            error: true,
            message: "No Technician Assigned"
        };
    }

    const StaffID = assigned.StaffID;

    const ServiceRequestNo = "SR-" + Date.now();

    const data = await insert({
        ServiceRequestNo,
        ServiceRequestTypeID: formData.ServiceRequestTypeID,
        StaffID,
        ServiceRequestTitle: formData.ServiceRequestTitle,
        ServiceRequestDescription: formData.ServiceRequestDescription,
        ServiceRequestStatusID: 1,
        PriorityLevel: formData.PriorityLevel || "Low",
        UserID
    });

    if (!data) {
        return {
            error: true,
            message: "Error while creating ServiceRequest"
        };
    }

    return {
        error: false,
        data,
        message: "ServiceRequest created successfully"
    };
}

async function getAllRequests() {

    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "ServiceRequests fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error fetching ServiceRequests"
    };
}

async function getRequestByID(id) {

    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "ServiceRequest fetched successfully"
        };
    }

    return {
        error: true,
        message: "ServiceRequest not found"
    };
}

async function changeRequestStatus(id, StatusID) {

    const data = await updateStatus(id, StatusID);

    if (!data) {
        return {
            error: true,
            message: "Error updating request status"
        };
    }

    return {
        error: false,
        message: "Request status updated successfully"
    };

}

async function getTechnicianRequests(staffID) {

    const data = await getByStaffID(staffID);

    if (data) {
        return {
            error: false,
            data,
            message: "Technician requests fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error fetching technician requests"
    };
}

module.exports = { createRequest, getAllRequests, getRequestByID, changeRequestStatus, getTechnicianRequests };