const { getAll, getByID, insert, update, softDeleteByID } = require("../models/serviceRequestType.model");
const { getDeptByID } = require("./serviceDept.service");
const { getTypeByID } = require("./serviceType.service");

async function getAllRequestType() {
    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "Request Types fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching request types"
    };
}

async function getRequestTypeByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Request Type fetched successfully"
        };
    }

    return {
        error: true,
        message: "Request type not found"
    };
}

async function createRequestType(formData, userId) {

    const serviceType = await getTypeByID(formData.ServiceTypeId);
    if (!serviceType || serviceType.error) {
        return {
            error: true,
            message: "Invalid ServiceTypeID"
        };
    }

    const dept = await getDeptByID(formData.ServiceDeptId);
    if (!dept || dept.error) {
        return {
            error: true,
            message: "Invalid ServiceDeptID"
        };
    }

    const data = await insert({
        ...formData,
        UserID
    });

    if (data) {
        return {
            error: false,
            data,
            message: "Request Type created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating request type"
    };
}

async function updateRequestType(id, formData) {

    const updatedData = await update(id, formData);

    if (!updatedData || updatedData.affectedRows === 0) {
        return {
            error: true,
            message: "Request Type not found or no changes made"
        };
    }

    const requestType = await getByID(id);

    return {
        error: false,
        data: requestType,
        message: "Request Type updated successfully"
    };
}

async function deleteRequestType(id) {

    const deletedData = await softDeleteByID(id);

    if (!deletedData) {
        return {
            error: true,
            message: "Request Type not found or already deleted"
        };
    }

    return {
        error: false,
        data: { RequestTypeID: id },
        message: "Request Type deleted successfully"
    };
}

module.exports = {getAllRequestType, getRequestTypeByID, createRequestType, updateRequestType, deleteRequestType};