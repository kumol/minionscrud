const app = require("express")();
require('dotenv').config()
require("./db/db");
const minionRoute = require("./api/route");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/v1/api/minion", minionRoute);


const port = process.env.PORT;
app.listen(port,(err)=>{
    if(!err){
        console.log(`app is running on port ${port}`);
    }else{
        console.log("Return error");
    }
});


