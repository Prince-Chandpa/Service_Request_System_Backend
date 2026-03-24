const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data] = await pool.query(
            `SELECT * FROM ServiceRequestStatus
            WHERE IsDeleted = 0`
        );
        return data;
    } catch (err) {
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data]] = await pool.query(
            `SELECT * FROM ServiceRequestStatus
            WHERE IsDeleted = 0 AND ServiceRequestStatusID = ?`,
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
            `INSERT INTO ServiceRequestStatus
            (ServiceRequestStatusName,
             ServiceRequestStatusSystemName,
             Sequence,
             Description,
             UserID,
             Created,
             Modified,
             ServiceRequestStatusCssClass,
             IsOpen,
             IsNoFurtherActionRequired,
             IsAllowedForTechnician,
             IsDeleted)
             VALUES (?,?,?,?,?,Now(),Now(),?,?,?,?,0)`,
            [
                formData.ServiceRequestStatusName,
                formData.ServiceRequestStatusSystemName,
                formData.Sequence,
                formData.Description,
                formData.UserID,
                formData.ServiceRequestStatusCssClass,
                formData.IsOpen,
                formData.IsNoFurtherActionRequired,
                formData.IsAllowedForTechnician
            ]
        );

        console.error(data)
        return data;
    } catch (err) {
        console.error(err.message)

        return false;
    }
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE ServiceRequestStatus 
             SET ServiceRequestStatusName=?,
                 ServiceRequestStatusSystemName=?,
                 Sequence=?,
                 Description=?,
                 Modified=NOW(),
                 ServiceRequestStatusCssClass=?,
                 IsOpen=?,
                 IsNoFurtherActionRequired=?,
                 IsAllowedForTechnician=?
             WHERE ServiceRequestStatusID=? AND IsDeleted=0`,
            [
                formData.ServiceRequestStatusName,
                formData.ServiceRequestStatusSystemName,
                formData.Sequence,
                formData.Description,
                formData.ServiceRequestStatusCssClass,
                formData.IsOpen,
                formData.IsNoFurtherActionRequired,
                formData.IsAllowedForTechnician,
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
            `UPDATE ServiceRequestStatus 
             SET IsDeleted = 1, Modified = NOW()
             WHERE ServiceRequestStatusID = ?`,
            [id]
        );
        return data.affectedRows;
    } catch (err) {
        console.error("Error deleting status: ", err.message);
        return false;
    }
}

module.exports = { getAll, getByID, insert, update, softDeleteByID }