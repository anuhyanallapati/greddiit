import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from "axios"

export const Register = (props) => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(username);
        axios.post('http://localhost:5000/api/users/register',
            {
                username, password, fname, lname, email, age, number
            },
            {
                headers:
                {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res.data)
                alert('user registered!')
                // navigate('/')
                window.location.reload()
            }).catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <section className='section'>
                <h2>Registration Page</h2>
            </section>
            <section className='section2'>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" placeholder="username" id="username" name="username" />

                    <label htmlFor="password">password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />


                    <label htmlFor="fname">First Name</label>
                    <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" placeholder="first name" id="fname" name="fname" />


                    <label htmlFor="lname">Last Name</label>
                    <input value={lname} onChange={(e) => setLname(e.target.value)} type="lname" placeholder="last name" id="lname" name="lname" />


                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" id="email" name="email" />


                    <label htmlFor="age">Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="age" id="age" name="age" />


                    <label htmlFor="number">Phone Number</label>
                    <input value={number} onChange={(e) => setNumber(e.target.value)} type="phnumber" placeholder="number" id="number" name="number" />

                    <button>Register</button>
                </form>
            </section>
            <section className='section3'>
                <button onClick={() => props.onFormSwitch('login')}>If already registered, Click here to login</button>
            </section>
        </div>
    );
};

export default Register;
