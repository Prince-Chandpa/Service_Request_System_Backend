const express = require("express");
const { getAllUsers, getUserByID, checkLogin, register, deleteUser, updateUser } = require("../services/users.service");

const routeUser = express.Router();

//get all users
routeUser.get("/", async (req, res) => {
    try {
        const data = await getAllUsers();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error:true,
            message:err.message
        });
    }
})

//get user by id
routeUser.get("/:id", async (req, res) => {
    try {
        const data = await getUserByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error:true,
            message:err.message
        });
    }
})

//register
routeUser.post("/register", async (req, res) => {
    try {
        const data = await register(req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error:true,
            message:err.message
        });
    }
})

//login
routeUser.post("/login", async (req, res) => {
    try {
        const data = await checkLogin(req.body);
        res.json(data);
    } catch (err) {
        res.status(401).json({
            error:true,
            message:err.message
        });
    }
})

//delete
routeUser.delete("/:id", async (req,res)=>{
    try{
        const data = await deleteUser(req.params.id);
        res.json(data);
    }catch(err){
        res.status(500).json({
            error:true,
            message:err.message
        });
    }
})

//update
routeUser.patch("/:id",async (req,res)=>{
    try{
        const data = await updateUser(req.params.id, req.body);
        res.json(data);
    }catch(err){
        res.status(500).json({
            error:true,
            message:err.message
        });
    }
})

module.exports = routeUser;