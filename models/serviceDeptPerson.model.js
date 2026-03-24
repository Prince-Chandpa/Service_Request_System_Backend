const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceDeptPerson
            WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        console.error(`Service Dept Person GET ALL SQLError : ${err.message}`);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceDeptPerson
            WHERE IsDeleted = 0 AND ServiceDeptPersonID = ?`,
            [id]
        );
        return data;
    } catch (err) {
        console.error(`Service Dept Person GET By ID SQLError : ${err.message}`);
        return false;
    }
}

async function checkHODExist(ServiceDeptID) {
    try {
        const [[data]] = pool.query(
            `SELECT * FROM ServiceDeptPerson
            WHERE ServiceDeptID = ? AND IsHODStaff = 1 AND IsDeleted = 0`,
            [ServiceDeptID]
        )

    } catch (err) {
        console.error(`Service Dept Person Check HOD SQLError : ${err.message}`);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data] = await pool.query(
            `INSERT INTO ServiceDeptPerson
            (ServiceDeptID,
            StaffID,
            FromDate,
            ToDate,
            Description,
            UserID,
            Created,
            Modified,
            IsHODStaff,
            IsDeleted)
            VALUES (?,?,?,?,?,?,NOW(),NOW(),?,0)`,
            [
                formData.ServiceDeptID,
                formData.StaffID,
                formData.FromDate,
                formData.ToDate,
                formData.Description,
                formData.UserID,
                formData.IsHODStaff
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Dept Person Insert SQLError : ${err.message}`);
        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceDeptPerson
            SET ServiceDeptID = ?,
                StaffID = ?,
                FromDate = ?,
                ToDate = ?
                Description = ?,
                Modified = NOW(),
                IsHODStaff = ?
            WHERE ServiceDeptPersonID = ? AND IsDeleted = 0`,
            [
                formData.ServiceDeptID,
                formData.StaffID,
                formData.FromDate,
                formData.ToDate,
                formData.Description,
                formData.IsHODStaff,
                id
            ]
        );
        return data;
    } catch (err) {
        console.error(`Service Dept Person Update SQLError : ${err.message}`);
        return false;
    }
}

async function softDeleteByID(id) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceDeptPerson
             SET IsDeleted = 1, Modified = NOW()
             WHERE ServiceDeptPersonID = ?`,
            [id]);
        return data;
    } catch (err) {
        console.error(`Service Dept Person Delete SQLError : ${err.message}`);
        return false;
    }
}

module.exports = { getAll, getByID, checkHODExist, insert, update, softDeleteByID }