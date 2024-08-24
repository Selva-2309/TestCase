import express from 'express';
import service from "../src/services/service.js";
import cors from 'cors';


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173/', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allow only these HTTP methods
    
};

app.use(cors());


app.use(express.json());
app.use("/",service);

app.listen(process.env.PORT || 5000, (err)=>{
    if(err) throw err;
    console.log(`Server is running successfully on http://localhost:${process.env.PORT || 5000}`);
})