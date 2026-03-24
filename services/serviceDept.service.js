const { getAll, getByID, insert, update, softDeleteByID } = require("../models/serviceDept.model");

async function getAllDept(){
    const data = await getAll();

    if(data){
        return {
            error:false,
            data,
            message:"Departments fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching departments"
    };
}

async function getDeptByID(id){
    const data = await getByID(id);

    if(data){
        return {
            error:false,
            data,
            message:"Department fetched successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching department"
    };
}

async function createDept(formData,UserID){
    const data = await insert({...formData,UserID});

    if(data){
        return {
            error:false,
            data,
            message:"Department created successfully"
        };
    }

    return {
        error: true,
        message: "Error while creating department"
    };
}

async function updateDept(id, formData){
    const data = await update(id, formData);

    if(data){
        return {
            error:false,
            data,
            message:"Department updated successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching departments"
    };
}

async function deleteDept(id){
    const data = await softDeleteByID(id);

    if(data){
        return {
            error:false,
            data,
            message:"Department deleted successfully"
        };
    }

    return {
        error: true,
        message: "Error while fetching departments"
    };
}

module.exports = {getAllDept, getDeptByID, createDept, updateDept, deleteDept}