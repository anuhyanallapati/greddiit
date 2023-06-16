import express from 'express';
import Report from '../models/Report.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { reported_by, reported_user, concern, post_it_is_associated_with} = req.body
        let report = new Report({ reported_by, reported_user, concern, post_it_is_associated_with })
        console.log([report])
        await report.save()
        res.send(report)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

export default router;