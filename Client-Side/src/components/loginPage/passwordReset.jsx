import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import bg from '../../assets/image.png';
import '../../../src/App.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordReset = () => {
  const token = Cookies.get('token');
  const [input, setInput] = useState({
    otp: '',
    password: '',
    confirmPassword: ''
  });
  const { email } = useParams();
  const navigate = useNavigate();
  console.log(email);

  const handleChange = (event) => {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const verifyOTP = async (event) => {
    event.preventDefault(); // Prevents form from refreshing the page

    try {
      const { data } = await axios.post(
        `http://localhost:4000/services/objects/verify-otp/${email}`,
        {
          "otp": input.otp,
          "password": input.password,
          "confirmPassword": input.confirmPassword
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(data);
      toast.success(data.message);
      
        navigate(`/auth/login`);
    
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        opacity: '0.6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      <Form
        onSubmit={verifyOTP} // Attach the verifyOTP function to form's onSubmit
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgb(242, 247, 247)',
          boxShadow: '0 4px 14px rgb(4, 102, 25)',
          padding: '20px',
          margin: '20px',
          borderRadius: '8px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '1px',
            width: '100%',
            padding: '40px',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}
          className='firstPage'
        >
          <Form.Group>
            <Form.Label className='label'>Enter OTP</Form.Label>
            <Form.Control
              type='text'
              placeholder='enter the otp here'
              name='otp'
              value={input.otp}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label'>New Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='please enter the password'
              name='password'
              value={input.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label'>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='please confirm the password'
              name='confirmPassword'
              value={input.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <button
            className='btn btn-success'
            style={{ width: '100%', marginTop: '20px' }}
            type='submit'
          >
            Reset Password
          </button>
        </div>
      </Form>
    </div>
  );
};

export default PasswordReset;
