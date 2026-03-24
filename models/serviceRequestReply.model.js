const pool = require("../db/mysql");

// Create Reply
async function createReply(data) {
  const query = `
    INSERT INTO ServiceRequestReply
    (
      ServiceRequestID,
      StaffID,
      ServiceRequestReplyDateTime,
      ServiceRequestReplyDescription,
      ServiceRequestStatusID,
      ServiceRequestStatusDateTime,
      ServiceRequestStatusByUserID,
      UserID,
      Created,
      Modified
    )
    VALUES
    (?, ?, NOW(), ?, ?, NOW(), ?, ?, NOW(), NOW())
  `;

  const values = [
    data.ServiceRequestID,
    data.StaffID,
    data.ServiceRequestReplyDescription,
    data.ServiceRequestStatusID,
    data.ServiceRequestStatusByUserID,
    data.UserID
  ];

  const [result] = await pool.query(query, values);

  return result;
}


// Get Replies by Request ID
async function getRepliesByRequestID(requestID) {

  const query = `
    SELECT *
    FROM ServiceRequestReply
    WHERE ServiceRequestID = ?
    ORDER BY ServiceRequestReplyDateTime ASC
  `;

  const [rows] = await pool.query(query, [requestID]);

  return rows;
}


// Update ServiceRequest Status
async function updateRequestStatus(requestID, statusID, userID) {

  const query = `
    UPDATE ServiceRequest
    SET
      ServiceRequestStatusID = ?,
      ServiceRequestStatusDateTime = NOW(),
      ServiceRequestStatusByUserID = ?
    WHERE ServiceRequestID = ?
  `;

  const [result] = await pool.query(query, [
    statusID,
    userID,
    requestID
  ]);

  return result;
}

module.exports = {
  createReply,
  getRepliesByRequestID,
  updateRequestStatus
};