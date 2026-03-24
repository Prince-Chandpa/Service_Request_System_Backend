const express = require("express");
const { getAllType, getTypeByID, createType, updateType, deleteType } = require("../services/serviceType.service");

const routeType = express.Router();

routeType.get("/", async (req, res) => {
    try {
        const data = await getAllType();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeType.get("/:id", async (req, res) => {
    try {
        const data = await getTypeByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeType.post("/", async (req, res) => {
    try {
        const data = await createType(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeType.patch("/:id", async (req, res) => {
    try {
        const data = await updateType(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeType.delete("/:id", async (req, res) => {
    try {
        const data = await deleteType(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeType;