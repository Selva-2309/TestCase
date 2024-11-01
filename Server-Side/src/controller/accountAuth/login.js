
import pool from "../../configuration/database.js";
import bycrypt from 'bcrypt';
const verifylogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const queryResult = await pool.query("select password,Id from users where name =$1", [username]);
        console.log(queryResult)
        if (queryResult.rows.length == 1) {
            const hashPass = queryResult.rows[0].password;
            bycrypt.compare(password, hashPass, (err, has) => {
                if(err){
                    return res.status(500).json({message:err});
                }
                if (has) {
                    return res.status(200).json({ message: "Account logged in successfully", Id:queryResult.rows[0].id })
                    
                } else {
                    return res.status(404).json({ messsage: "Password doesn't match" });
                }
            })
        } else {
            return res.status(404).json({ message: "User name does not match" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.hint || "Internal Server error" });
    }
};

export default verifylogin;