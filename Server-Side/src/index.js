import express from 'express';
import service from "../src/services/service.js";
const app = express();

app.use(express.json());
app.use("/",service);

app.listen(process.env.PORT || 5000, (err)=>{
    if(err) throw err;
    console.log(`Server is running successfully on http://localhost:${process.env.PORT || 5000}`);
})