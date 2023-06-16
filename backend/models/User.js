import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

/*sanchit
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nickname: String,

    // normally username should be unique
    username: String,
    password: String,

    // mongodb doesn't make sure you follow a fixed schema
    // however, mongoose makes sure you follow a fixed schema

    // user can have two or more seperate schemas with the help of discriminator key
});
*/

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers:{
        type: Array,
    },
    following:{
        type: Array,
    }
});

// can not use arrow function here
UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function () {

    // payload -> whatever you want to encode
    const payload = {
        user: {
            id: this._id
        }
    }
    const secret = process.env.SECRET_KEY;

    // 360000 -> 100 hours
    const token = jwt.sign(payload, secret, { expiresIn: 360000 });

    return token;
}

const User = mongoose.model("users", UserSchema);

export default User;