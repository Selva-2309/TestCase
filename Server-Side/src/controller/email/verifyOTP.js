import pool from '../../configuration/database.js';
import getUsers from '../users/usersQuery.js';
import bcrypt from 'bcrypt'; // For password hashing

const verifyOTP = async (req, res) => {
  try {
    const { email } = req.params;
    const { otp, password, confirmPassword } = req.body;

    // Check if user exists
    const checkEmail = await getUsers.getUsersByEmail(email);
    if (checkEmail.res === 'No records found') {
      return res.status(404).json({ message: 'User Not Found' });
    }

    // Get OTP from the database
    const getOtp = await pool.query(`SELECT otp FROM users WHERE email=$1`, [email]);
    console.log(getOtp.rows[0].otp)
    if (!getOtp.rows[0] || getOtp.rows[0].otp != otp) {
      return res.status(400).json({ message: 'OTP is not valid or expired' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Hash the new password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the OTP
    try {
      const response = await pool.query(
        `UPDATE users SET password=$1, otp=null WHERE email=$2 RETURNING id`,
        [hashedPassword, email]
      );
      return res.status(200).json({
        success: true,
        id: response.rows[0].id,
        message: 'Password updated successfully...',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.hint ? error.hint : 'Internal Server Error',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.hint ? error.hint : 'Internal Server Error',
    });
  }
};

export default verifyOTP;
