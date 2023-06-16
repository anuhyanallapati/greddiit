import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    posted_by: {
        type: String,
        required: true
    },
    posted_in: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    downvotes: {
        type: Number,
        required: true,
        default: 0
    },
});

const Post = mongoose.model("posts", PostSchema);

export default Post;