import React, { useState, useEffect } from "react";
import SpecialNavbar from "../special_navbar";
import axios from 'axios';

const Temp = () => {

    const [subgreddiits, setSubgreddiits] = useState([]);
    // const sgid = localStorage.getItem('currmsg')

    useEffect(() => {
        console.log(localStorage.getItem('currmsg'))
        const curr = localStorage.getItem('currmsg')
        console.log("curr", curr)
        axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
        axios.post('http://localhost:5000/api/mysubgreddiit/opened',
            {
                // data: {
                sgid: curr
                // }
            })
            .then(res => {
                setSubgreddiits(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        console.log(subgreddiits)
    })

    return (
        <div>
            <SpecialNavbar></SpecialNavbar>
            <div>
                <h1>{subgreddiits.name}</h1>
                <p>{subgreddiits.description}</p>
            </div>
        </div>
    )
};
export default Temp;