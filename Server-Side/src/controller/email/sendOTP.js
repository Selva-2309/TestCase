import getUsers from '../users/usersQuery.js';
import sendEmailContent from './sendEmail.js';
import pool from '../../configuration/database.js';

const sendOTP = async (req, res) => {
    const { email } = req.params;
    try {
        const checkUser = await getUsers.getUsersByEmail(email);
       console.log(checkUser)
        if (checkUser.res == "No records found") {
            
            return res.status(404).json({ message: "User not found" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000);

        // Use parameterized queries to prevent SQL injection
        const updateOTP = await pool.query(`UPDATE users SET otp = $1 WHERE email = $2`, [otp, email]);

        if (updateOTP.rowCount > 0) {
            const content = {
                to: email,
                subject: 'Reset Password',
                text: `Reset the password with the given OTP: ${otp}`
            };
            await sendEmailContent(content, res);
        } else {
            return res.status(500).json({ message: "Failed to update OTP" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.hint ? error.hint : "Internal Server Error" });
    }
};

export default sendOTP;
