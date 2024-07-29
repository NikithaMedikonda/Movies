import mongoose,{Schema,Model} from "mongoose";

export const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    movieYear:{
        type: Number,
        required:true
    },
    movieURL:{
        type: String,
        required: true
    },
    movieRank:{
        type:Number,
        required: true
    },
    critic_score:{
        type:Number,
        set:function(value: string){
            return parseFloat(value.slice(0,-1));
        }
    },
    audience_score:{
        type:Number,
        set:function(value: string){
            return parseFloat(value.slice(0,-1));
        }
    }
})

export const movie = mongoose.model('movie', movieSchema);