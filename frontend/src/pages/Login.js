import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { LaptopWindows } from '@material-ui/icons';

export const Login = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/home';
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in handle submit");

    axios.post('http://localhost:5000/api/users/login',
      {
        email,
        password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        alert("successfully logged in")
        localStorage.setItem('token', res.data)
        axios.defaults.headers.common["x-auth-token"] = res.data;
        navigate("/home")
        // console.log(res.data)
      }).catch(err => {
        console.log(err)
      })

    // if (username === 'admin' && password === 'admin') {
    //   console.log("Successful login");
    //   localStorage.setItem('token', res.data.token);
    //   window.location.href = '/home';
    // } else {
    //   console.log("Invalid credentials");
    // }
  }

  return (
    <div>
      <section className='section'>
        <h2>Login Page</h2>
      </section>
      <section className='section2'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" />
          <label htmlFor="password">password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
          <button disabled={!email || !password}>Log In</button>
        </form>
      </section>
      <section className='section3'>
        <button onClick={() => props.onFormSwitch('register')}>If not registered, Click here to register</button>
      </section>
    </div>
  );
};

export default Login;