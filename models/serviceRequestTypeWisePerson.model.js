const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceRequestTypeWisePerson
             WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Wise Person GET ALL SQLError : ${err.message}`);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceRequestTypeWisePerson
             WHERE ServiceRequestTypeWisePersonID = ? AND IsDeleted = 0`,
            [id]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Wise Person GET By ID SQLError : ${err.message}`);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO ServiceRequestTypeWisePerson
            (ServiceRequestTypeID,
             StaffID,
             UserID,
             Created,
             Modified,
             IsDeleted)
             VALUES (?, ?, ?, NOW(), NOW(), 0)`,
            [
                formData.ServiceRequestTypeID,
                formData.StaffID,
                formData.UserID
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Wise Person Insert SQLError : ${err.message}`);
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceRequestTypeWisePerson
             SET ServiceRequestTypeID=?,
                 StaffID=?,
                 Modified=NOW()
             WHERE ServiceRequestTypeWisePersonID=? AND IsDeleted=0`,
            [
                formData.ServiceRequestTypeID,
                formData.StaffID,
                id
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Request Type Wise Person Update SQLError : ${err.message}`);
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceRequestTypeWisePerson
             SET IsDeleted=1,
                 Modified=NOW()
             WHERE ServiceRequestTypeWisePersonID=?`,
            [id]);
        return data;
    } catch (err) {
        console.error(`Service Request Type Wise Person Delete SQLError : ${err.message}`);
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }