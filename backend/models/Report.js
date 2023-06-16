import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    reported_by: {
        type: String,
        required: true
    },
    reported_user: {
        type: String,
        required: true
    },
    concern: {
        type: String,
        required: true,
    },
    post_it_is_associated_with: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
});

const Report = mongoose.model("reports", ReportSchema);

export default Report;