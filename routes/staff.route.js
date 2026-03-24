const express = require("express");
const { getAllStaff, getStaffByID, createStaff, updateStaff, deleteStaff } = require("../services/staff.service");

const routeStaff = express.Router();

routeStaff.get("/", async (req, res) => {
    try {
        const data = await getAllStaff();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStaff.get("/:id", async (req, res) => {
    try {
        const data = await getStaffByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStaff.post("/", async (req, res) => {
    try {
        const data = await createStaff(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStaff.patch("/:id", async (req, res) => {
    try {
        const data = await updateStaff(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStaff.delete("/:id", async (req, res) => {
    try {
        const data = await deleteStaff(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeStaff;