import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from '../navbar';
import { Navigate, useNavigate } from "react-router-dom";

const MySubGred = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [bannedKeywords, setBannedKeywords] = useState([]);
    const [subgreddiits, setSubgreddiits] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // create a new subgreddiit and add it to the list
        const newSubgreddiit = {
            name,
            description,
            tags: tags.split(",").map((tag) => tag.trim()),
            banned_keywords: bannedKeywords
                .split(",")
                .map((keyword) => keyword.trim().toLowerCase()),
        };

        axios.post('http://localhost:5000/api/subgreddiit/create',
            {
                name,
                description,
                tags: tags.split(",").map((tag) => tag.trim()),
                banned_keywords: bannedKeywords
                    .split(",")
                    .map((keyword) => keyword.trim().toLowerCase()),
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        // setSubgreddiits([...subgreddiits, newSubgreddiit]);
        // reset form state
        setName("");
        setDescription("");
        setTags([]);
        setBannedKeywords([]);
        setShowForm(false);

        window.location.reload()
    };

    useEffect(() => {
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
        axios.get('http://localhost:5000/api/mysubgreddiit/displayFew')
            .then(res => {
                setSubgreddiits(res.data)
                console.log(localStorage.getItem("token"))
                // console.log(user)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <div>
                {!showForm && (
                    <button onClick={() => setShowForm(true)}>
                        Create a new subgreddiit
                    </button>
                )}
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        ></textarea>

                        <label htmlFor="tags">Tags (Single Word, Lower Case, Multiple):</label>
                        <input
                            type="text"
                            id="tags"
                            value={tags}
                            onChange={(event) => setTags(event.target.value)}
                        />

                        <label htmlFor="bannedKeywords">
                            Banned Keywords (Single Word, Case Insensitive, Multiple):
                        </label>
                        <input
                            type="text"
                            id="bannedKeywords"
                            value={bannedKeywords}
                            onChange={(event) => setBannedKeywords(event.target.value)}
                        />

                        <button type="submit">Create</button>
                    </form>
                )}
                <div>
                    <h1>My Subreddits</h1>
                    {subgreddiits.map((subgreddiit) => (
                        <div key={subgreddiit._id}>
                            <h2>{subgreddiit.name}</h2>
                            <p>{subgreddiit.description}</p>
                            <p>{subgreddiit.tags.join(", ")}</p>
                            <p>Banned keywords: {subgreddiit.banned_keywords.join(", ")}</p>
                            <button onClick={() => {
                                // axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
                                axios.delete(`http://localhost:5000/api/mysubgreddiit/delete`,
                                    {
                                        data: {
                                            sgid: subgreddiit._id
                                        }
                                    })
                                    .then(res => {
                                        setSubgreddiits(res.data);
                                        console.log("delit fr")
                                        window.location.reload()
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }}>Delete</button>

                            <button onClick={() => {
                                localStorage.setItem('currmsg', subgreddiit._id)
                                // axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
                                axios.post(`http://localhost:5000/api/mysubgreddiit/Open`,
                                    {
                                        // data: {
                                        sgid: subgreddiit._id
                                        // }
                                    })
                                    .then(res => {
                                        // const newPageUrl = `http://localhost:3000/subgreddiits/Open/Page`;
                                        // window.open(newPageUrl, "_blank");
                                        console.log(subgreddiit._id)
                                        navigate("/mysubgreddiit/temp")

                                        // window.location.reload();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            }}>Open</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MySubGred;
