import {movie} from "../Models/movieModel"
import { user } from "../Models/userModel"

export const getRatings = async(movieName:String)=>{
    // const findId = await movie.findOne({movieTitle:movieName},{_id:1})
    // if (!findId){
    //     console.log("No movie");
    //     return
    // }
    // const movieId = findId._id;
    // const result = await user.aggregate([
    //     {$match:{movieId:movieId}},
    //     {$group:{_id:"$rating", sum: {$sum: 1}}},{$sort: {_id:-1}}
    // ])

    const result = await user.aggregate([
        {
            $lookup: {
                from: 'movies',            
                localField: 'movieId',     
                foreignField: '_id',       
                as: 'movieDetails'         
            }},
        { $unwind: '$movieDetails'},
        { $match: {'movieDetails.movieTitle': movieName}},
        { $group: {_id: '$rating',sum: { $sum: 1 }}},
        { $sort: { _id: -1 } }
    ]); 
    return result; 
}