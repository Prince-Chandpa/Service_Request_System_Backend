const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceDept
            WHERE ISDeleted = 0`
        );
        return data;
    } catch (err) {
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceDept
            WHERE ServiceDeptID = ? AND IsDeleted = 0`,
            [id]
        );
        return data;
    } catch (err) {
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO ServiceDept
            (ServiceDeptName,
             CampusID,
             Description,
             UserID,
             Created,
             Modified,
             CCEmailToCSV,
             IsRequestTitleDisable,
             IsDeleted)
             VALUES (?,?,?,?,NOW(),NOW(),?,?,0)`,
            [
                formData.ServiceDeptName,
                formData.CampusId,
                formData.Description,
                formData.UserID,
                formData.CCEmailToCSV,
                formData.IsRequestTitleDisable
            ]
        );
        return data;
    } catch (err) {
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceDept 
             SET ServiceDeptName=?,
                 CampusID=?,
                 Description=?,
                 Modified=NOW(),
                 CCEmailToCSV=?,
                 IsRequestTitleDisable=?
             WHERE ServiceDeptID=? AND IsDeleted=0`,
            [
                formData.ServiceDeptName,
                formData.CampusID,
                formData.Description,
                formData.CCEmailToCSV,
                formData.IsRequestTitleDisable,
                id
            ]
        );
        return data;
    } catch (err) {
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceDept 
             SET IsDeleted = 1, Modified = NOW()
             WHERE ServiceDeptID = ?`,
            [id]
        );
        return data;
    } catch (err) {
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }