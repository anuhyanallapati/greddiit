import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// we send username and password through body
// in get requests we usually dont send bodies
router.post("/", async (req, res) => {

    // login
    /*
    1. check if password is correct
        if password isn't correct, return
        if it is correct, continue
    2. generate a token
    */

    try {

        const { username, password } = req.body;
        console.log(username, password);

        // check if username and password are valid as a string itself using express validator

        const user = await User.findOne({ name : username });
        if (!user) {
            return res.status(400).send({ errors: [{ msg: 'No user found' }] });
        }
        const match = await user.checkPassword(password);

        if (match) {
            const token = user.generateToken();
            return res.send({ token });
        }

        return res.status(400).send({ errors: [{ msg: 'Invalid Password' }] });
    } catch (err) {
        res.status(500).send({ errors: [{ msg: 'Server Error' }] })
    }
});

export default router;