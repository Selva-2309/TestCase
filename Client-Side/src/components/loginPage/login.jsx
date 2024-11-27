import React, { useState } from 'react';
import bg from '../../assets/image.png';
import '../../../src/App.css'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [flag, setFlag] = useState(true);
    const [token, setToken] = useState();
    const [input, setInput] = useState({
        username:"",
        password:"",
        email:"",
        cpassword:""
    });
    const navigate = useNavigate();

    useEffect(() => {
       
        fetchToken();
      }, []);

      const handleInput = (e)=>{
        setInput((prevState)=>({
            ...prevState,[e.target.name]:e.target.value
        }))
        
      }
      const fetchToken = async () => {
        try {
          const { data } = await axios.post('http://localhost:4000/server/data/token', { user: 'demo', password: '123' });
          setToken(data.token);
          Cookies.set('token',data.token,{expires:1/24,path:'/'});
          
        } catch (error) {
          console.error('Error fetching token:', error);
        }
      };
    const verfyLogin = async(e)=>{
        e.preventDefault();
        try {
            if(flag){
                loginPage();
            }
            else{
                createUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loginPage = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/services/auth/login',
                
                {
                   username:input.username,
                   password:input.password
                },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });
            if(response && response.status === 200){
                console.log(response.data.message);
                Cookies.set('user',input.username,{path:'/'});
                Cookies.set('userId',response.data.Id, {path:'/'});
                navigate(`/auth/dashboard`);
            }
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
                const message = error.response.data.message;
                alert(message)
            }
        }
    };

    const createUser = async ()=>{
        try {
            const response = await axios.post('http://localhost:4000/services/auth/signup',{
                username:input.username,
                email:input.email,
                password:input.password,
                cpassword:input.cpassword
            },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                }
            });

            if(response.status ===201){
                navigate('/auth/login');
                alert('user created successfully!..');
            }

        } catch (error) {
            if(error.response){
                const message = error.response.data.message;
                console.log(message);
            }
        }
    }

    useEffect(()=>{
        if(location.pathname=='/auth/login'){
            setFlag(true);
        }else{
            setFlag(false);
        }
    })

    return (
        <div style={{ backgroundImage: `url(${bg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        opacity: '0.6', 
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center' 
        }}>
            <form onSubmit={verfyLogin} style={{
                display: 'flex',
                flexDirection: 'column',  
                alignItems: 'center', 
                width:'300px',
                backgroundColor:'rgb(242, 247, 247)',
                boxShadow:'0 4px 14px rgb(4, 102, 25)',
                padding:'20px', 
                margin:'40px', 
                borderRadius:'8px'
               
                }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent:'space-evenly',
                    width:'100%'
                   
                    }}>
                        <h4 onClick={() => { setFlag(true); navigate(`/auth/login`) }}  style={{width:'50%',textAlign:'center',borderBottom: flag? '3px solid green':'3px solid grey', color: flag? 'rgb(4, 102, 25)':'grey'}}>login</h4>
                        <h4 onClick={() => { setFlag(false); navigate(`/auth/signup`) }} style={{width:'50%',textAlign:'center',borderBottom: !flag? '3px solid green':'3px solid grey', color: !flag? 'rgb(4, 102, 25)':'grey'}}>Signup</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', margin:'30px' }} className='firstPage'>
                    {
                        flag == true ?
                            (<>
                                <label>username</label>
                                <input type='text' name='username' value={input.username} onChange={handleInput} required></input>
                                <label>password</label>
                                <input type='password' name='password' value={input.password} onChange={handleInput} required></input>
                                <button type='submit'>login</button>
                                <p>Forgot Password?</p>
                            </>)
                            :
                            (<>
                                <label>Name</label>
                                <input type='text' name='username' value={input.username} onChange={handleInput} required></input>
                                <label>Email</label>
                                <input type='email' name='email' value={input.email} onChange={handleInput} required></input>
                                <label>password</label>
                                <input type='password' name='password' value={input.password} onChange={handleInput} required></input>
                                <label>Confirm Password</label>
                                <input type='password' name='cpassword' value={input.cpassword} onChange={handleInput} required></input>
                                <button type='submit'>Create account</button>
                            </>)
                    }
                </div>

            </form>
        </div>
    );
}

export default Login;
