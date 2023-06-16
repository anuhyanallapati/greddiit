import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import MyProfile from './MyProfile';
import SpecialNavbar from '../special_navbar';

const useStyles = makeStyles({
  section: {
    fontSize: '2rem',
    color: 'black',
    textAlign: 'left',
  },
});

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

const Home = () => {

  const [user, setUser] = useState({})

  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [age, setAge] = useState("")
  const [number, setNumber] = useState("")

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    axios.get('http://localhost:5000/api/users/home')
      .then(res => {
        setUser(res.data)
        console.log(localStorage.getItem("token"))
        // console.log(user)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    console.log(user)
  }, [])

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // axios.put()

    var temp = {}

    if (fname.length)
      temp.fname = fname
    else
      temp.fname = user.fname

    if (lname.length)
      temp.lname = lname
    else
      temp.lname = user.lname

    if (age.length)
      temp.age = age
    else
      temp.age = user.age

    if (number.length)
      temp.number = number
    else
      temp.number = user.number

    console.log(temp)

    axios.put('http://localhost:5000/api/users/update',
      {
        temp
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res.data)
      window.location.reload()
    }).catch((err) => {
      console.log("onoooooo")
    })

    setIsEditing(false);
  };

  // const handleChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };

  return (
    <div>
      <Navbar></Navbar>
      {/* <SpecialNavbar></SpecialNavbar> */}
      <section className={classes.section}>
        <h2>Profile Page</h2>
        <button onClick={handleEdit}>
          <EditIcon className={classes.icon} />
          Edit
        </button>
      </section>
      <section>
        <h3>Followers & Following</h3>
        <MyProfile />
      </section>
      <section>
        <h3>Details</h3>
        {isEditing ? (
          <form onSubmit={handleSave}>
            <label>
              First Name:
              <input
                type="text"
                name="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
            <label>
              Contact Number:
              <input
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        ) : (
          <div>
            <h4>Name: {user.fname} {user.lname}</h4>
            <h4>Age: {user.age}</h4>
            <h4>Contact Number: {user.number}</h4>
          </div>
        )}
      </section>
      <section>
        <LogoutButton />
      </section>
    </div>

  );
};

export default Home;