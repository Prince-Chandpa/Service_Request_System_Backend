const { getAll, getByID, insert, update, softDeleteByID } = require("../models/staff.model");
const { getUserByID } = require("./users.service");

async function getAllStaff() {
    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "Staff fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching staff"
    };
}

async function getStaffByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Staff fetched successfully"
        };
    }

    return {
        error: true,
        message: "Staff not found"
    };
}

async function createStaff(formData) {

    const user = await getUserByID(formData.UserID);
    if (!user || user.error) {
        return {
            error: true,
            message: "Invalid UserID"
        };
    }

    const data = await insert(formData);

    if (data) {
        return {
            error: false,
            data,
            message: "Staff created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating staff"
    };
}

async function updateStaff(id, formData) {

    const updatedData = await update(id, formData);

    if (!updatedData || updatedData.affectedRows === 0) {
        return {
            error: true,
            message: "Staff not found or no changes made"
        };
    }

    const staff = await getByID(id);

    return {
        error: false,
        data: staff,
        message: "Staff updated successfully"
    };
}

async function deleteStaff(id) {

    const deletedData = await softDeleteByID(id);

    if (!deletedData) {
        return {
            error: true,
            message: "Staff not found or already deleted"
        };
    }

    return {
        error: false,
        data: { StaffID: id },
        message: "Staff deleted successfully"
    };
}

module.exports = { getAllStaff, getStaffByID, createStaff, updateStaff, deleteStaff };
