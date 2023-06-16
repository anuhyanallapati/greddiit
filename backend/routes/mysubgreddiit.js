import express from 'express';
import Subgreddiit from '../models/SubGreddiit.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/displayFew', auth, async (req, res) => {
    try {
        const moderator = req.user.id;
        console.log("mod", moderator)
        const subgreddiit = await Subgreddiit.find({ moderator })
        // console.log("sg", subgreddiit)
        res.send(subgreddiit)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { sgid } = req.body
        console.log("bd", req.body)
        const sg = await Subgreddiit.findByIdAndDelete(sgid)
        console.log("delete")
        res.send(sg)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

// check
router.post('/open', async (req, res) => {
    try {
        const { sgid } = req.body
        const sg = await Subgreddiit.findById(sgid)
        console.log(sgid)
        res.send(sg)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.post('/opened', async (req, res) => {
    try {
        const { sgid } = req.body
        const sg = await Subgreddiit.findById(sgid)
        console.log(sgid)
        res.send(sg)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

export default router;