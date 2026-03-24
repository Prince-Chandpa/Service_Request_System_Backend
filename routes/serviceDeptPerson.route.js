const express = require("express");
const { getAllDeptPerson, getDeptPersonByID, createDeptPerson, updateDeptPerson, deleteDeptPerson } = require("../services/serviceDeptPerson.service");

const routeDeptPerson = express.Router();

routeDeptPerson.get("/", async (req, res) => {
    try {
        const data = await getAllDeptPerson();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDeptPerson.get("/:id", async (req, res) => {
    try {
        const data = await getDeptPersonByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDeptPerson.post("/", async (req, res) => {
    try {
        const data = await createDeptPerson(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDeptPerson.patch("/:id", async (req, res) => {
    try {
        const data = await updateDeptPerson(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeDeptPerson.delete("/:id", async (req, res) => {
    try {
        const data = await deleteDeptPerson(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeDeptPerson;