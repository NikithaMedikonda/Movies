import mongoose, {Schema,model} from "mongoose";

export const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    reviewId: {
        type: String
    },
    isVerified: {
        type: Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    isSuperReviewer:{
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    hasSpoilers:{
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    hasProfanity:{
        type:Boolean,
        set: function(value: string){
            return Boolean(value);
        }
    },
    score:{
        type:Number
    },
    creationDate:{
        type: Date
    }
})
export const user = mongoose.model('user', userSchema);