import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/User.js';
import auth from '../middleware/auth.js'

const router = express.Router();

/**
 * @route /api/users
 * @description Edit name of current user
 * @access Private
 */

router.get("/", async (req, res) => {
    try{
        const users= await User.find();
        res.send(users);
    } catch(err){
        // check which error and respond accordingly
        console.error("Error:", err);
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        // find -> it will return a list
        // findOne -> whatever your giving will only return one user (to optimise code)
        // const users= await User.findOne({_id: id});
        // .select to fetch only required fields
        const users= await User.findById(id);
        res.send(users);
    } catch(err){
        // check which error and respond accordingly
        console.error("Error:", err);
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }
});

// change name of user
router.put("/:id",auth, async (req, res) => {
    try{
        console.log("req user", req.user);
        // const {id} = req.params;
        const id=req.user.id;
        const {name} = req.body;

        // server -> db -> server
        const users= await User.findById(id);
        users.name=name;

        // server -> db -> server
        await users.save();

        // more efficient const users= await User.findById(id); + await users.save();
        // name: name can be written as name also
        // await User.findByIdAndUpdate(id,{name,nickname: 'changed nickname'});
        // mongoose find and update increment -> $inc
        res.send(users);
    } catch(err){
        // check which error and respond accordingly
        console.error("Error:", err);
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }
});

// In general, post request is used to add data to database
router.post("/", async (req, res) => {
    try {
        const { name, nickname, username, password } = req.body;

        // check if things are valid, if they aren't send bad request
        // express validator
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(422).json({ errors: errors.array() });
        // }
        
        let user=await User.findOne({username});
        if(user){
            // bad request -> username already exists
            return res.status(400).send({ errors: [{ msg: 'Username already exists' }] });
        }

        // at this point, we know that username doesn't already exist
        user=new User({name,nickname,username,password});
        
        // hash or encrypt the password
        const salt=await bcrypt.genSalt();
        user.password=await bcrypt.hash(user.password,salt);

        // const user = new User({ name, nickname, email: 's@s.com' });
        await user.save();

        res.send(user);
    } catch (err) {
        console.error("Error:", err);
        // 500 -> internal server error
        res.status(500).send({ errors: [{ msg: 'Server Error' }] });
    }
})

router.get("/:id/post/:postId", (req, res) => {
    console.log(req.params);
    const { postId } = req.params;
    if (postId > 0)
        res.send('Hello');
    else
        res.status(400).send("Invalid postId");
});



export default router;