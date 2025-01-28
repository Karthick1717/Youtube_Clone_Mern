import React, { useState } from 'react';
import "./Login.css"
import axios from "axios"
import { toast } from 'react-toastify';
import { setToken } from '../redux/slice';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload={
      name:name,
      email:email,
      password:password
    }
    try{
    const response=await axios.post("http://localhost:7000/login",payload)
    localStorage.setItem("token",response.data.token)
     dispatch(setToken(response.data.token))
     navigate("/")
    }
    catch(err){
       toast.error(err.response.data)
    }
  };
  const handleSubmited = async (event) => {
    event.preventDefault();
    const payload={
      name:name,
      email:email,
      password:password
    }
    try{
    const response=await axios.post("http://localhost:7000/register",payload)
    switchToLogin()
    console.log(response)
    }
    catch(err){
      toast.error(err.response.data.message)
    }
  };

  return (
    <div>
      {isLogin ? (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="text" name="email" onChange={(e)=>setemail(e.target.value)} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" onChange={(e)=>setpassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <span onClick={switchToSignup}>Sign up here</span>
          </p>
        </div>
      ) : (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSubmited}>
            <div>
              <label>Username:</label>
              <input type="text" name="username"  onChange={(e)=>setname(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email"  onChange={(e)=>setemail(e.target.value)} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password"  onChange={(e)=>setpassword(e.target.value)} required />
            </div>
            <button type="submit">Signup</button>
          </form>
          <p>
            Already have an account? <span onClick={switchToLogin}>Login here</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
