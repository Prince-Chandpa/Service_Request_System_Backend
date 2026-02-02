const express = require("express");
const { getAllUsers } = require("../services/users.service");

const routeUser = express.Router();

routeUser.get("/", async (req,res) => {
    try{
        const data = await getAllUsers();
        res.json(data);
    }catch(err){
        res.status(500).json(data);
    }
})

module.exports = routeUser;