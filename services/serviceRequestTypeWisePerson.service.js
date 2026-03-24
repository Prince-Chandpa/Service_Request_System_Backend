const { getAll, getByID, insert, update, softDeleteByID } = require("../models/serviceRequestTypeWisePerson.model");
const { getRequestTypeByID } = require("./serviceRequestType.service");
const { getStaffByID } = require("./staff.service");

async function getAllTypeWisePerson() {
    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "Type Wise Person fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching type wise person"
    };
}

async function getTypeWisePersonByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Type Wise Person fetched successfully"
        };
    }

    return {
        error: true,
        message: "Type Wise Person not found"
    };
}

async function createTypeWisePerson(formData) {

    const staff = await getStaffByID(formData.StaffID);
    if (!staff || staff.error) {
        return {
            error: true,
            message: "Invalid StaffID"
        };
    }

    const requestType = await getRequestTypeByID(formData.ServiceRequestTypeID);
    if (!requestType || requestType.error) {
        return {
            error: true,
            message: "Invalid ServiceRequestTypeID"
        };
    }

    const data = await insert({ ...formData, UserID });

    if (data) {
        return {
            error: false,
            data,
            message: "Type Wise Person created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating type wise person"
    };
}

async function updateTypeWisePerson(id, formData) {

    const updatedData = await update(id, formData);

    if (!updatedData || updatedData.affectedRows === 0) {
        return {
            error: true,
            message: "Type Wise Person not found or no changes made"
        };
    }

    const data = await getByID(id);

    return {
        error: false,
        data,
        message: "Type Wise Person updated successfully"
    };
}

async function deleteTypeWisePerson(id) {

    const deletedData = await softDeleteByID(id);

    if (!deletedData) {
        return {
            error: true,
            message: "Type Wise Person not found or already deleted"
        };
    }

    return {
        error: false,
        data: { id },
        message: "Type Wise Person deleted successfully"
    };
}

module.exports = { getAllTypeWisePerson, getTypeWisePersonByID, createTypeWisePerson, updateTypeWisePerson, deleteTypeWisePerson }