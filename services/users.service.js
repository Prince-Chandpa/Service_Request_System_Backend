const { getAll } = require("../models/users.model");

async function getAllUsers() {
    const data = await getAll();
    if(data){
        return {
            error: false,
            data,
            message: "Users fetched successfully"
        };
    }else{
        return {
            error: true,
            message: "Some error occured while fetching the users !!"
        };
    }
}

module.exports = { getAllUsers };