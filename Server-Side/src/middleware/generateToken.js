import jwt from 'jsonwebtoken';
import secretKey from '../configuration/jwtConfig.js';

const generateToken = async (user)=>{
    try {
        const payload = {
            user:user.user,
            pass:user.password
        }

        return jwt.sign(payload, secretKey,{expiresIn:"1h"});
    } catch (error) {
        console.error(error);
    }
}

const verifyToken = async(token)=>{
    try {
        return new Promise((resolve, reject)=>{
            jwt.verify(token, secretKey, (err,decode)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(decode);
                }
            })
        })
    } catch (error) {
        console.error(error);
    }
};

export default {generateToken, verifyToken};