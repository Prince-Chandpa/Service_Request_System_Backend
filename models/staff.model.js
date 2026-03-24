const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM Staff
            WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        console.error(`Staff Type GET ALL SQLError : ${err.message}`);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM Staff
             WHERE StaffID = ? AND IsDeleted = 0`,
            [id]
        );
        return data;
    } catch (err) {
        console.error(`Staff Type GET By ID SQLError : ${err.message}`);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO Staff
            (UserID,
             IsActive,
             Created,
             Modified,
             IsDeleted)
             VALUES (?, ?, NOW(), NOW(), 0)`,
            [
                formData.UserID,
                formData.IsActive
            ]
        );
        return data;
    } catch (err) {
        console.error(`Staff Type Insert SQLError : ${err.message}`);
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE Staff
             SET UserID=?,
                 IsActive=?,
                 Modified=NOW()
             WHERE StaffID=? AND IsDeleted=0`,
            [
                formData.UserID,
                formData.IsActive,
                id
            ]
        );
        return data;
    } catch (err) {
        console.error(`Staff Type Update SQLError : ${err.message}`);
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE Staff
             SET IsDeleted = 1,
                 Modified = NOW()
             WHERE StaffID = ?`,
            [id]
        );
        return data;
    } catch (err) {
        console.error(`Staff Type Delete SQLError : ${err.message}`);
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }