const pool = require("../db/mysql");

async function getAll() {
    try{
        const [data, fileds] = await pool.query("SELECT * FROM User");
        return data;
    }catch(err){
        console.error("MySQL connection failed: ", err.message);
        return false;
    }
}

module.exports = { getAll };