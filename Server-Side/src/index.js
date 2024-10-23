import express from 'express';
import service from "../src/services/service.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();


// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:5173/', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allow only these HTTP methods
    
};

app.use(cors());


app.use(express.json());
app.use("/",service);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(process.env.PORT || 5000, (err)=>{
    if(err) throw err;
    console.log(`Server is running successfully on http://localhost:${process.env.PORT || 5000}`);
})