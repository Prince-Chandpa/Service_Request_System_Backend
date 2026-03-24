const express = require("express");

const {
  addReply,
  getReplies
} = require("../services/serviceRequestReply.service");

const authMiddleware = require("../middlewares/auth.middleware");

const routeServiceRequestReply = express.Router();


// Add Reply
routeServiceRequestReply.post("/", authMiddleware, async (req, res) => {

  try {

    const data = await addReply(req.body, req.user.UserID);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: true,
      message: err.message
    });

  }

});


// Get Replies of a Request
routeServiceRequestReply.get("/:requestID", authMiddleware, async (req, res) => {

  try {

    const data = await getReplies(req.params.requestID);

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: true,
      message: err.message
    });

  }

});


module.exports = routeServiceRequestReply;