import express from 'express';
const router = express.Router();

// we're posting data on postman and getting the values on terminal using a get request

router.post("/user/:userId", (req,res)=>{
    console.log("req",req.params, req.body);
    res.send({name:"anuhya", nickname:"anu"});
})

export default router;