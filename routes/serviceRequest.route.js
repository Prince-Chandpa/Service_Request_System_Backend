const express = require("express");
const { createRequest, getAllRequests, getRequestByID, changeRequestStatus } = require("../services/serviceRequest.service");

const routeServiceRequest = express.Router();

routeServiceRequest.post("/", async (req, res) => {
    try {
        const data = await createRequest(req.body, req.user.UserID);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeServiceRequest.get("/", async (req, res) => {
    try {
        const data = await getAllRequests();
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeServiceRequest.get("/:id", async (req, res) => {
    try {
        const data = await getRequestByID(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        });
    }
})

routeServiceRequest.patch("/status/:id", async (req, res) => {

    try {

        const { StatusID } = req.body;
        const data = await changeRequestStatus(req.params.id, StatusID);

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: true,
            message: err.message
        });
    }

});

routeServiceRequest.get("/technician", async (req, res) => {
  try {

    const data = await getTechnicianRequests(req.user.StaffID);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: true,
      message: err.message
    });

  }
});

module.exports = routeServiceRequest;