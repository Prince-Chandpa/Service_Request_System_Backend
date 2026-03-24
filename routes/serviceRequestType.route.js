const express = require("express");
const { getAllRequestType, getRequestTypeByID, createRequestType, updateRequestType, deleteRequestType } = require("../services/serviceRequestType.service");

const routeRequestType = express.Router();

routeRequestType.get("/", async (req, res) => {
    try {
        const data = await getAllRequestType();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeRequestType.get("/:id", async (req, res) => {
    try {
        const data = await getRequestTypeByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeRequestType.post("/", async (req, res) => {
    try {
        const data = await createRequestType(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeRequestType.patch("/:id", async (req, res) => {
    try {
        const data = await updateRequestType(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeRequestType.delete("/:id", async (req, res) => {
    try {
        const data = await deleteRequestType(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeRequestType;