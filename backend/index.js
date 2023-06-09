const express = require('express')
const app = express()
const port = process.env.PORT||5000
const cors = require("cors");
app.use(cors());

const mongoDB=require("./db")
mongoDB()
app.get('/', (req, res) => {
})

//middleware
app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","https://farmeasyyy.onrender.com");
res.setHeader('Access-Control-Allow-Credentials', 'true');
res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Control-Type, Accept"
);
next();
});
app.use(express.json())
app.use("/api",require("./routes/createUser"))
app.use("/api",require("./routes/displayData"))
app.use("/api",require("./routes/orderData"))
app.use("/api",require("./routes/reviews"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})