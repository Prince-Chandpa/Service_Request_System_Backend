const { getAll, getByID, insert, update, softDeleteByID, checkHODExist } = require("../models/serviceDeptPerson.model");
const { getDeptByID } = require("./serviceDept.service");
const { getStaffByID } = require("./staff.service");

async function getAllDeptPerson() {
    const data = await getAll();

    if (data) {
        return {
            error: false,
            data,
            message: "Department Person fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching department person"
    };
}

async function getDeptPersonByID(id) {
    const data = await getByID(id);

    if (data) {
        return {
            error: false,
            data,
            message: "Department Person fetched successfully"
        };
    }

    return {
        error: true,
        message: "Department Person not found"
    };
}

async function createDeptPerson(formData, UserID) {

    const dept = await getDeptByID(formData.ServiceDeptID);
    if (!dept || dept.error) {
        return {
            error: true,
            message: "Invalid ServiceDeptID"
        };
    }

    const staff = await getStaffByID(formData.StaffID);

    if (!staff || staff.error) {
        return {
            error: true,
            message: "Invalid StaffID"
        };
    }

    if (formData.IsHODStaff === 1) {
        const hodExist = await checkHODExist(formData.ServiceDeptID);
        if (hodExist) {
            return {
                error: true,
                message: "HOD already assigned for this department"
            };
        }
    }

    const data = await insert({ ...formData, UserID });

    if (data) {
        return {
            error: false,
            data,
            message: "Department Person created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating request type"
    };
}

async function updateDeptPerson(id, formData) {

    const updatedData = await update(id, formData);

    if (!updatedData || updatedData.affectedRows === 0) {
        return {
            error: true,
            message: "Department Person not found or no changes made"
        };
    }

    const deptPerson = await getByID(id);

    return {
        error: false,
        data: deptPerson,
        message: "Department Person updated successfully"
    };
}

async function deleteDeptPerson(id) {

    const data = await softDeleteByID(id);

    if (!data) {
        return {
            error: true,
            message: "Department Person not found or already deleted"
        };
    }

    return {
        error: false,
        data: { DeptPersonID: id },
        message: "Department Person deleted successfully"
    };
}

module.exports = { getAllDeptPerson, getDeptPersonByID, createDeptPerson, updateDeptPerson, deleteDeptPerson };