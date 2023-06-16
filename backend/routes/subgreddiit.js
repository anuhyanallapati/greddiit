import express from 'express';
import Subgreddiit from '../models/SubGreddiit.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, async (req, res) => {
    try {
        const { name, description, tags, banned_keywords } = req.body
        console.log("create req",req.body)
        let subgreddiit = await Subgreddiit.findOne({ name })
        console.log("sg", subgreddiit)
        if (subgreddiit) {
            console.log("subgreddiit with that name already exists")
            res.status(400).send()
        }
        const moderator = req.user.id
        // console.log("req", req.id)
        subgreddiit = new Subgreddiit({ name, description, tags, banned_keywords, moderator })
        console.log(subgreddiit)
        await subgreddiit.save()
        res.send(subgreddiit)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})


router.get('/displayAll', async (req, res) => {
    try {
        const subgreddiits = await Subgreddiit.find()
        console.log(subgreddiits)
        res.send(subgreddiits)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

export default router;