import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewMessage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

 export default mongoose.model('feedback', feedbackSchema);
