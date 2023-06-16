import express from 'express';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { text, posted_by, posted_in, upvotes, downvotes } = req.body
        let post = new Post({ text,posted_by,posted_in,upvotes,downvotes })
        console.log([post])
        await post.save()
        res.send(post)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

export default router;