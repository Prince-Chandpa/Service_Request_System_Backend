const { getAll, getByID, insert, update, softDeleteByID } = require("../models/serviceRequestStatus.model");

async function getAllStatus(){
    const data = await getAll();
    if(data){
        return {
            error:false,
            data,
            message:"Service Request Status fetched successfully"
        };
    }

    return {
        error:true,
        message: "Error while fetching status"
    };
}

async function getStatusByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Status fetched successfully"
        };
    }

    return {
        error: true,
        message: "Status not found"
    };
}

async function createStatus(formData, UserID) {
    const data = await insert({
        ...formData,
        UserID
    });
    if (data) {
        return {
            error: false,
            data,
            message: "Status created successfully"
        };
    }
    return {
        error: true,
        message: "Error while creating status"
    };
}

async function updateStatus(id, formData) {
    const updatedData = await update(id, formData);

    if (!updatedData || updatedData.affectedRows === 0) {
        return {
            error: true,
            message: "Status not found or no changes made"
        };
    }

    const status = await getByID(id);

    return {
        error: false,
        data: status,
        message: "Status updated successfully"
    };
}

async function deleteStatus(id) {
    const deletedData = await softDeleteByID(id);

    if (!deletedData) {
        return {
            error: true,
            message: "Status not found or already deleted"
        };
    }

    return {
        error: false,
        data: { StatusID: id },
        message: "Status deleted successfully"
    };
}

module.exports = {getAllStatus, getStatusByID, createStatus, updateStatus, deleteStatus}