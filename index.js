const express = require("express");
require("dotenv").config();

const routeUser = require("./routes/users.route");


const app = express();

app.use(express.json());
app.use("/users",routeUser);

// app.get("/", (req,res) => {
//     res.send("Hello From GET Method");
// });

app.listen(process.env.PORT,()=>{
    console.log(`Server Started @ ${process.env.PORT}`);
});