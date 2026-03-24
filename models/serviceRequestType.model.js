const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceRequestType
            WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type GET ALL SQLError : ${err.message}`);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceRequestType
            WHERE ServiceRequestTypeID = ? AND IsDeleted = 0`,
            [id]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type GET By ID SQLError : ${err.message}`);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO ServiceRequestType
                (ServiceTypeID,
                 ServiceDeptID,
                 ServiceRequestTypeName,
                 Description,
                 Sequence,
                 UserID,
                 Created,
                 Modified,
                 RequestTotal,
                 RequestPending,
                 RequestClosed,
                 RequestCancelled,
                 IsVisibleResource,
                 DefaultPriorityLevel,
                 ReminderDaysAfterAssignment,
                 IsMandatoryResource,
                 IsDeleted)
             VALUES (?,?,?,?,?,?,NOW(),NOW(),0,0,0,0,?,?,?,?,0)`,
            [
                formData.ServiceTypeID,
                formData.ServiceDeptID,
                formData.ServiceRequestTypeName,
                formData.Description,
                formData.Sequence,
                formData.UserID,
                formData.IsVisibleResource,
                formData.DefaultPriorityLevel,
                formData.ReminderDaysAfterAssignment,
                formData.IsMandatoryResource
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Insert SQLError : ${err.message}`);
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceRequestType
             SET ServiceTypeID=?,
                 ServiceDeptID=?,
                 ServiceRequestTypeName=?,
                 Description=?,
                 Sequence=?,
                 Modified=NOW(),
                 IsVisibleResource=?,
                 DefaultPriorityLevel=?,
                 ReminderDaysAfterAssignment=?,
                 IsMandatoryResource=?
             WHERE ServiceRequestTypeID=? AND IsDeleted=0`,
            [
                formData.ServiceTypeId,
                formData.ServiceDeptId,
                formData.ServiceRequestTypeName,
                formData.Description,
                formData.Sequence,
                formData.IsVisibleResource,
                formData.DefaultPriorityLevel,
                formData.ReminderDaysAfterAssignment,
                formData.IsMandatoryResource,
                id
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Update SQLError : ${err.message}`);
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceRequestType
             SET IsDeleted = 1, Modified = NOW()
             WHERE ServiceRequestTypeID = ?`,
            [id]);
        return data.affectedRows;
    } catch (err) {
        console.error(`Service Request Type Delete SQLError : ${err.message}`);
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }