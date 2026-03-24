const { getAll, getByID, insert, update, softDeleteByID } = require("../models/serviceType.model");

async function getAllType() {
    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "Service Types fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching service types"
    };
}

async function getTypeByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Service Type fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching service type"
    };
}

async function createType(formData, UserID) {
    if (!formData.ServiceTypeName) {
        return { error: true, message: "Service Type Name required" }
    }

    const data = await insert({ ...formData, UserID });

    if (data) {
        return {
            error: false,
            data,
            message: "Service Type created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating service type"
    };
}

async function updateType(id, formData) {
    const data = await update(id, formData);

    if (data) {
        return {
            error: false,
            data,
            message: "Service Type updated successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching service type"
    };
}

async function deleteType(id) {
    const data = await softDeleteByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Service Type deleted successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching service type"
    };
}

module.exports = { getAllType, getTypeByID, createType, updateType, deleteType };