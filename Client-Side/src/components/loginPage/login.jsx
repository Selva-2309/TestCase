import React, { useState } from 'react';
import bg from '../../assets/image.png';
import '../../../src/App.css'
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Form, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
    const [flag, setFlag] = useState(true);
    const [token, setToken] = useState();
    const [input, setInput] = useState({
        username: "",
        password: "",
        email: "",
        cpassword: ""
    });
    const navigate = useNavigate();
    const [shows, setShow] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        fetchToken();
    }, []);

    const handleInput = (e) => {
        setInput((prevState) => ({
            ...prevState, [e.target.name]: e.target.value
        }))

    }
    const fetchToken = async () => {
        try {
            const { data } = await axios.post('http://localhost:4000/server/data/token', { user: 'demo', password: '123' });
            setToken(data.token);
            Cookies.set('token', data.token, { expires: 1 / 24, path: '/' });

        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };
    const verfyLogin = async (e) => {
        e.preventDefault();
        try {
            if (flag) {
                loginPage();
            }
            else {
                createUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginPage = async () => {
        try {
            const response = await axios.post('http://localhost:4000/services/auth/login',

                {
                    username: input.username,
                    password: input.password
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response && response.status === 200) {
                console.log(response.data.message);
                Cookies.set('user', input.username, { path: '/' });
                Cookies.set('userId', response.data.Id, { path: '/' });
                Cookies.set('toastMessage', 'logged in successfully');
                navigate(`/auth/dashboard`);


            }
        } catch (error) {
            if (error.response) {
                const message = error.response.data.message;
                toast.error(message)
            }
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post('http://localhost:4000/services/auth/signup', {
                username: input.username,
                email: input.email,
                password: input.password,
                cpassword: input.cpassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                navigate('/auth/login');
                toast.success('user created successfully!..', { autoClose: 3000 });
            }

        } catch (error) {
            if (error.response) {
                const message = error.response.data.message;
                toast.error(message);
                console.log(message);
            }
        }
    }

    const sendOTP = async (email) => {
        try {
            const { data } = await axios.post(`http://localhost:4000/services/objects/send-otp/${email}`, {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log(data);

            toast.success(data.message);
            
            setTimeout(() => {
                setIsDisabled(false);
                setShow(false);
                navigate(`/auth/reset-password/${input.email}`);
            }, 1000);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
            setIsDisabled(false);
        }
    };

    useEffect(() => {
        if (location.pathname == '/auth/login') {
            setFlag(true);
        } else {
            setFlag(false);
        }
    })

    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            opacity: '0.6',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
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
            <Form onSubmit={verfyLogin} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'rgb(242, 247, 247)',
                boxShadow: '0 4px 14px rgb(4, 102, 25)',
                padding: '20px',
                margin: '20px',
                borderRadius: '8px',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '100%'

                }}>
                    <h4 onClick={() => { setFlag(true); navigate(`/auth/login`), setInput({ username: "", password: "", email: "", cpassword: "" }) }} style={{ width: '50%', cursor: 'pointer', textAlign: 'center', borderBottom: flag ? '3px solid green' : '3px solid grey', color: flag ? 'rgb(4, 102, 25)' : 'grey' }}>login</h4>
                    <h4 onClick={() => { setFlag(false); navigate(`/auth/signup`), setInput({ username: "", password: "", email: "", cpassword: "" }) }} style={{ width: '50%', cursor: 'pointer', textAlign: 'center', borderBottom: !flag ? '3px solid green' : '3px solid grey', color: !flag ? 'rgb(4, 102, 25)' : 'grey' }}>Signup</h4>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1px',
                    width: '100%',
                    padding: '40px',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }} className='firstPage'>
                    {
                        flag == true ?
                            (<FirstPage 
                                input={input} 
                                handleInput={handleInput} 
                                shows={shows} 
                                setShow={setShow} 
                                sendOTP={sendOTP}  
                                isDisabled={isDisabled} 
                                setIsDisabled={setIsDisabled} 
                            />)
                            :
                            (<SecondPage input={input} handleInput={handleInput} />)
                    }
                </div>

            </Form>
        </div>
    );
}


const FirstPage = ({ input, handleInput, shows, setShow, sendOTP, isDisabled, setIsDisabled }) => {
    return (
        <div>
            <div>
                <Form.Group >
                    <Form.Label className='label'>Username</Form.Label>
                    <Form.Control type='text' name='username' value={input.username} onChange={handleInput} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label className='label' >Password</Form.Label>
                    <Form.Control type='password' name='password' value={input.password} onChange={handleInput} required />
                </Form.Group>

                <Form.Group>
                    <button className="btn btn-success" style={{ width: '100%', marginTop: '20px' }}>login</button>
                </Form.Group>
            </div>
            <p className='label' style={{ paddingTop: '20px', cursor: 'pointer' }} onClick={() => { setShow(true); }} > Forgot Password?</p>

            <Modal show={shows} onHide={() => { setShow(false) }} centered className='modal'>
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
                <Modal.Header className='label'>Forgot Password</Modal.Header>

                <Modal.Body>
                    <Form >
                        <Form.Group>
                            <Form.Label className='label'>Email</Form.Label>
                            <Form.Control type='email' name='email' value={input.email} onChange={handleInput} required />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        <button className='btn btn-success' type='button' onClick={() => {
                            setIsDisabled(true);
                            sendOTP(input.email);


                        }} disabled={isDisabled}> Generate OTP</button>
                    </div>
                </Modal.Footer>

            </Modal>
        </div>
    )
}

const SecondPage = ({ input, handleInput }) => {
    return (
        <div>
            <Form.Group>
                <Form.Label className='label' >Name</Form.Label>
                <Form.Control type='text' name='username' value={input.username} onChange={handleInput} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='label' >Email</Form.Label>
                <Form.Control type='email' name='email' value={input.email} onChange={handleInput} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='label' >Password</Form.Label>
                <Form.Control type='password' name='password' value={input.password} onChange={handleInput} minLength={8} required />
            </Form.Group>
            <Form.Group>
                <Form.Label className='label' >Confirm Password</Form.Label>
                <Form.Control type='password' name='cpassword' value={input.cpassword} onChange={handleInput} minLength={8} required />
            </Form.Group>

            <Form.Group>
                <button className="btn btn-success" type='submit' style={{ width: '100%', marginTop: '20px' }}>Create account</button>
            </Form.Group>


        </div>
    );
}

export default Login;
