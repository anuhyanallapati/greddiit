import mongoose from 'mongoose';

const SubGreddiitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        lowercase: true,
    }],
    banned_keywords: [{
        type: String,
        lowercase: true,
    }],
    moderator: {
        type: String,
    },
});

const SubGreddiit = mongoose.model("subgreddiit", SubGreddiitSchema);

export default SubGreddiit;