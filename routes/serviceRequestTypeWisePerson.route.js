const express = require("express");
const { getAllTypeWisePerson, getTypeWisePersonByID, createTypeWisePerson, updateTypeWisePerson, deleteTypeWisePerson } = require("../services/serviceRequestTypeWisePerson.service");

const routeTypeWisePerson = express.Router();

routeTypeWisePerson.get("/", async (req, res) => {
    try {
        const data = await getAllTypeWisePerson();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeTypeWisePerson.get("/:id", async (req, res) => {
    try {
        const data = await getTypeWisePersonByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeTypeWisePerson.post("/", async (req, res) => {
    try {
        const data = await createTypeWisePerson(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeTypeWisePerson.patch("/:id", async (req, res) => {
    try {
        const data = await updateTypeWisePerson(req.params.id,req.body);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeTypeWisePerson.delete("/:id", async (req, res) => {
    try {
        const data = await deleteTypeWisePerson(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

module.exports = routeTypeWisePerson;