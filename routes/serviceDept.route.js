const express = require("express");
const { getAllDept, getDeptByID, createDept, updateDept, deleteDept } = require("../services/serviceDept.service");

const routeDept = express.Router();

routeDept.get("/", async (req, res) => {
    try {
        const data = await getAllDept();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDept.get("/:id", async (req, res) => {
    try {
        const data = await getDeptByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDept.post("/", async (req, res) => {
    try {
        const data = await createDept(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDept.patch("/:id", async (req, res) => {
    try {
        const data = await updateDept(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDept.delete("/:id", async (req, res) => {
    try {
        const data = await deleteDept(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeDept;