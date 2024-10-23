import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs'


    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            const dir = path.resolve("src/assets");

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
    
            cb(null, dir);
        },
        filename: (req, file, cb)=>{
            cb(null, randomUUID()+".png" );
        }
    })
 
    const upload = multer({storage: storage});

export default upload;
