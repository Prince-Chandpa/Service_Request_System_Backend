const pool = require("../db/mysql");

async function getAll() {
    try {
        const [data, fileds] = await pool.query("SELECT * FROM User WHERE IsActive = 1");
        return data;
    } catch (err) {
        console.error("MySQL connection failed: ", err.message);
        return false;
    }
}

async function getByID(id) {
    try {
        const [[data], fileds] = await pool.query(
            `SELECT * FROM User WHERE IsActive = 1 AND  UserID = ?`, [id]
        );
        return data;
    } catch (err) {
        console.error("MySQL connection failed: ", err.message);
        return false;
    }
}

async function insert(formData) {
    try {
        const [data, fields] = await pool.query(
            `INSERT INTO User (Name,Email,MobileNumber,Password,Department,Designation,Location,JoiningDate,Role,IsActive) 
            VALUES (?,?,?,?,?,?,?,NOW(),?,1)`,
            [formData.Name, formData.Email, formData.MobileNumber, formData.Password, formData.Department, formData.Designation, formData.Location, formData.Role]
        )
        return data;
    } catch (err) {
        console.error("Error inserting user: ", err.message);
        return {error:true, message: err.message};
    }
}

async function getUserByEmail(Email) {
    try {
        const [[data], fields] = await pool.query(
            `SELECT * FROM User WHERE Email = ?`, [Email]
        );
        return data;

    } catch (err) {
        console.error("MySQL connection failed: ", err.message);
        return false;
    }
}

async function softDeleteByID(id) {
    const [data] = await pool.query(
        `UPDATE User SET IsActive = 0 WHERE IsActive = 1 AND UserID = ?`,
        [id]
    );

    return data.affectedRows;
}

async function update(id, formData) {
    try {
        const [data] = await pool.query(
            `UPDATE User SET Name=?, Email=?, MobileNumber=?, Password=?, Department=?, Designation=?, Location=?, Role=?, IsActive=? WHERE UserID=?`,
            [formData.Name, formData.Email, formData.MobileNumber, formData.Password, formData.Department, formData.Designation, formData.Location, formData.Role, formData.IsActive || 1, id]
        );
        return data;
    } catch (err) {
        console.error("Error updating user: ", err.message);
        return false;
    }
}

module.exports = { getAll, getByID, getUserByEmail, insert, softDeleteByID, update };