import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import auth from '../middleware/auth.js'

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password, fname, lname, email, age, number } = req.body
        console.log(req.body)
        let user = await User.findOne({ email })
        console.log(user)
        if (user) {
            console.log("email already there")
            res.status(400).send()
        }
        user = new User({ fname, lname, username, email, age, number, password })
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        await user.save()
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.put('/update', auth, async (req, res) => {
    try {
        const { temp } = req.body
        console.log(req.body)
        let user = await User.findById(req.user.id)
        if (user) {
            user.fname = temp.fname
            user.lname = temp.lname
            user.age = temp.age
            user.number = temp.number
        }
        else {
            console.log('invalid user')
            return
        }
        await user.save()
        res.send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const user = await User.findOne({ email })
        console.log(user)
        if (!user) {
            console.log("user not found")
            res.status(400).send()
        }
        // console.log("hi")
        const passwordMatched = await user.checkPassword(password)
        console.log(passwordMatched)
        if (passwordMatched) {
            const token = user.generateToken()
            // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii")
            res.send(token)
        }
        else {
            console.log("wrong password")
            res.status(400).send()
        }
    } catch (err) {
    }
})

router.get('/home', auth, async (req, res) => {
    try {
        // console.log(req.user.id)
        const user = await User.findById(req.user.id)
        res.send(user)
    } catch (err) {
        console.log(err)
        req.status(500).send()
    }
})

router.get('/home/following', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id)
        var following = []
        for (let i = 0; i < user.following.length; i++) {
            let u = await User.findById(user.following[i])
            following.push(u.username)
            console.log(u.username)
        }
        res.send(following)
    } catch (err) {
        console.log(err)
        req.status(500).send()
    }
})

router.get('/home/followers', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id)
        var followers = []
        for (let i = 0; i < user.followers.length; i++) {
            let u = await User.findById(user.followers[i])
            followers.push(u.username)
            console.log(u.username)
        }
        res.send(followers)
    } catch (err) {
        console.log(err)
        req.status(500).send()
    }
})

router.put('/home/unfollow', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id)

        const { index } = req.body
        console.log(index)

        if (index >= 0) {
            user.following.splice(index, 1);
        }

        await user.save()

        var following = []
        for (let i = 0; i < user.following.length; i++) {
            let u = await User.findById(user.following[i])
            following.push(u.username)
            console.log(u.username)
        }
        res.send(following)
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

router.put('/home/removefollower', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        const user = await User.findById(req.user.id)

        const { index } = req.body
        console.log(index)

        if (index >= 0) {
            user.followers.splice(index, 1);
        }

        await user.save()

        var followers = []
        for (let i = 0; i < user.followers.length; i++) {
            let u = await User.findById(user.followers[i])
            followers.push(u.username)
            console.log(u.username)
        }
        res.send(followers)
    }
    catch (err) {
        console.log(err)
        res.status(500).send()
    }
})

export default router;