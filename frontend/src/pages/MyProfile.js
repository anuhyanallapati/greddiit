import React, { useEffect, useState } from 'react';
import axios from "axios"

const MyProfile = () => {

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    axios.get('http://localhost:5000/api/users/home/following')
      .then(res => {
        setFollowing(res.data)
        // console.log(following)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    axios.get('http://localhost:5000/api/users/home/followers')
      .then(res => {
        setFollowers(res.data)
        // console.log(following)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    console.log("im just bad bad bad", followers, following)
  }, [followers, following])

  const handleClickFollowers = () => {
    setShowFollowers(!showFollowers);
  };

  const handleClickFollowing = () => {
    setShowFollowing(!showFollowing);
  };

  const handleRemoveFollower = (index) => {
    // const updatedFollowers = [...followers];
    // updatedFollowers.splice(index, 1);
    // setFollowers(updatedFollowers);
    console.log(index)
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    axios.put('http://localhost:5000/api/users/home/removefollower',
      {
        index
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setFollowers(res.data)
        // window.location.reload()
        // console.log(following)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleUnfollow = (index) => {
    // const updatedFollowing = [...following];
    // updatedFollowing.splice(index, 1);
    // setFollowing(updatedFollowing);
    console.log(index)
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
    axios.put('http://localhost:5000/api/users/home/unfollow',
      {
        index
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        setFollowing(res.data)
        // window.location.reload()
        // console.log(following)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div>
      <div>
        <button onClick={handleClickFollowers}>Followers</button>{' '}
        <span>{followers.length}</span>
        {showFollowers && (
          <ul>
            {followers.map((follower, index) => (
              <li key={index}>
                {follower}{' '}
                <button onClick={() => handleRemoveFollower(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <button onClick={handleClickFollowing}>Following</button>{' '}
        <span>{following.length}</span>
        {showFollowing && (
          <ul>
            {following.map((user, index) => (
              <li key={index}>
                {user}{' '}
                <button onClick={() => handleUnfollow(index)}>Unfollow</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyProfile;