import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar';

const SubGred = () => {
    const [subgreddiits, setSubgreddiits] = useState([]);

    useEffect(() => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
        axios.get('http://localhost:5000/api/subgreddiit/displayAll')
            .then(res => {
                setSubgreddiits(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>Subreddits</h1>
                {subgreddiits.map(subgreddiit => (
                    <div key={subgreddiit._id}>
                        <h2>{subgreddiit.name}</h2>
                        <p>{subgreddiit.description}</p>
                        <p>{subgreddiit.tags.join(', ')}</p>
                        <p>Banned keywords: {subgreddiit.banned_keywords.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubGred;

