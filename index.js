const express = require("express");
require("dotenv").config();
const cors = require("cors");

const authenticateToken = require("./middlewares/auth.middleware");
const routeUser = require("./routes/users.route");
const routeStatus = require("./routes/serviceRequestStatus.route");
const routeDept = require("./routes/serviceDept.route");
const routeType = require("./routes/serviceType.route");
const routeRequestType = require("./routes/serviceRequestType.route");
const routeStaff = require("./routes/staff.route");
const routeDeptPerson = require("./routes/serviceDeptPerson.route");
const routeTypeWisePerson = require("./routes/serviceRequestTypeWisePerson.route");
const routeServiceRequest = require("./routes/serviceRequest.route");
const serviceRequestReplyRoute = require("./routes/serviceRequestReply.route");


const app = express();

app.use(express.json());
app.use(cors());
app.use(authenticateToken);

app.use("/users", routeUser);
app.use("/status", routeStatus);
app.use("/department", routeDept);
app.use("/type", routeType);
app.use("/request-type", routeRequestType);
app.use("/staff", routeStaff);
app.use("/department-person", routeDeptPerson);
app.use("/type-wise-person", routeTypeWisePerson);
app.use("/service-request",routeServiceRequest);
app.use("/service-request-reply", serviceRequestReplyRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server Started @ ${process.env.PORT}`);
});