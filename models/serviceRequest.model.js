const pool = require("../db/mysql");

async function insert(formData) {
    try {

        const [data] = await pool.query(
            `INSERT INTO ServiceRequest
            (
                ServiceRequestNo,
                ServiceRequestDateTime,
                ServiceRequestTypeID,
                StaffID,
                ServiceRequestTitle,
                ServiceRequestDescription,
                ServiceRequestStatusID,
                PriorityLevel,
                UserID,
                Created,
                Modified,
                IsDeleted
            )
            VALUES
            (?, NOW(), ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), 0)`,
            [
                formData.ServiceRequestNo,
                formData.ServiceRequestTypeID,
                formData.StaffID,
                formData.ServiceRequestTitle,
                formData.ServiceRequestDescription,
                formData.ServiceRequestStatusID,
                formData.PriorityLevel,
                formData.UserID
            ]
        );

        return data;

    } catch (err) {

        console.error(`MySQL Error While Inserting In ServiceRequest : ${err.message}`);
        return false;

    }
}

async function getAll() {
    try {

        const [data] = await pool.query(
            `SELECT * FROM ServiceRequest
             WHERE IsDeleted = 0
             ORDER BY Created DESC`
        );

        return data;

    } catch (err) {

        console.error(`MySQL Error fetching ServiceRequest: ${err.message}`);
        return false;

    }
}

async function getByID(id) {
    try {

        const [[data]] = await pool.query(
            `SELECT * FROM ServiceRequest
             WHERE ServiceRequestID = ?
             AND IsDeleted = 0`,
            [id]
        );

        return data;

    } catch (err) {

        console.error(`Error fetching ServiceRequest by ID: ${err.message}`);
        return false;

    }
}

async function updateStatus(id, StatusID) {
    try {

        const [data] = await pool.query(
            `UPDATE ServiceRequest
             SET ServiceRequestStatusID = ?, Modified = NOW()
             WHERE ServiceRequestID = ? AND IsDeleted = 0`,
            [StatusID, id]
        );

        return data;

    } catch (err) {

        console.error(`MySQL Error While Updating Status : ${err.message}`);
        return false;

    }
}

async function getByStaffID(staffID) {
    try {

        const [data] = await pool.query(
            `SELECT *
             FROM ServiceRequest
             WHERE StaffID = ?
             AND IsDeleted = 0
             ORDER BY Created DESC`,
            [staffID]
        );

        return data;

    } catch (err) {

        console.error(`Error fetching ServiceRequest by StaffID: ${err.message}`);
        return false;

    }
}

module.exports = { insert, getAll, getByID, updateStatus, getByStaffID };