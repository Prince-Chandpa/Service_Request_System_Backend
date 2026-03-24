const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceType
            WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        console.error(`Service Type GET ALL SQLError : ${err.message}`);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceType
            WHERE ServiceTypeID = ? AND IsDeleted = 0`,
            [id]);
        return data;
    } catch (err) {
        console.error(`Service Type GET By ID SQLError : ${err.message}`);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO ServiceType
            (ServiceTypeName,
             Description,
             Sequence,
             UserID,
             IsForStaff,
             IsForStudent,
             Created,
             Modified,
             IsDeleted)
             VALUES (?,?,?,?,?,?,NOW(),NOW(),0)`,
            [
                formData.ServiceTypeName,
                formData.Description,
                formData.Sequence,
                formData.UserID,
                formData.IsForStaff,
                formData.IsForStudent
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Type Insert SQLError : ${err.message}`);
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceType
            SET ServiceTypeName = ?,
             Description = ?,
             Sequence = ?,
             IsForStaff = ?,
             IsForStudent = ?,
             Modified = NOW()
            WHERE ServiceTypeID = ? AND IsDeleted = 0`,
            [
                formData.ServiceTypeName,
                formData.Description,
                formData.Sequence,
                formData.IsForStaff || 0,
                formData.IsForStudent || 0,
                id
            ]);
        return data;
    } catch (err) {
        console.error(`Service Type Update SQLError : ${err.message}`);
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceType 
             SET IsDeleted = 1, Modified = NOW()
             WHERE ServiceTypeID = ?`,
            [id]
        );
        return data.affectedRows;
    } catch (err) {
        console.error(`Service Type Delete SQLError : ${err.message}`);
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }