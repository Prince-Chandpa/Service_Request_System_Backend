const replyModel = require("../models/serviceRequestReply.model");


// Add Reply
async function addReply(data, userID) {
  try {

    const payload = {
      ServiceRequestID: data.ServiceRequestID,
      StaffID: data.StaffID || null,
      ServiceRequestReplyDescription: data.description,
      ServiceRequestStatusID: data.ServiceRequestStatusID,
      ServiceRequestStatusByUserID: userID,
      UserID: userID
    };

    await replyModel.createReply(payload);

    // update request status
    await replyModel.updateRequestStatus(
      data.ServiceRequestID,
      data.ServiceRequestStatusID,
      userID
    );

    return {
      error: false,
      message: "Reply added successfully"
    };

  } catch (err) {

    return {
      error: true,
      message: err.message
    };

  }
}


// Get Replies
async function getReplies(requestID) {
  try {

    const replies = await replyModel.getRepliesByRequestID(requestID);

    return {
      error: false,
      data: replies
    };

  } catch (err) {

    return {
      error: true,
      message: err.message
    };

  }
}

module.exports = {
  addReply,
  getReplies
};