const express = require("express");
const { getAllStatus, getStatusByID, createStatus, updateStatus, deleteStatus } = require("../services/serviceRequestStatus.service");
// const authenticateRole = require("../middlewares/roleAuth.middleware");

const routeStatus = express.Router();

routeStatus.get("/", async (req, res) => {
    try {
        const data = await getAllStatus();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStatus.get("/:id", async (req, res) => {
    try {
        const data = await getStatusByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStatus.post("/", async (req, res) => {
    try {
        const data = await createStatus(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStatus.patch("/:id", async (req, res) => {
    try {
        const data = await updateStatus(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeStatus.delete("/:id", async (req, res) => {
    try {
        const data = await deleteStatus(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeStatus;