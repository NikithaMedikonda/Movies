import * as fs from 'fs';
import csv from 'csv-parser';
import nconf from "../Config/config";
import { movie } from '../Models/movieModel';
import { critic } from '../Models/criticModel';
import { user } from '../Models/userModel';

export const readFiles = () => { 
    const movieData = nconf.get('movieData');
    const userData = nconf.get('userData');
    const criticData = nconf.get('criticData');
    return {movieData,userData,criticData};
}

export const readCSVFile = async (filepath: string, name: string) => {
    return new Promise((resolve, reject) => {
        console.log(`Processing the file ${filepath}`)
        const stream = fs.createReadStream(filepath)
        const csvStream = csv();
        let processing = false;
        let recordCount = 0
        const csvPipe = stream.pipe(csvStream)
        csvPipe.on('data', async (data: any) => {
            console.log(`Processing Record ${++recordCount} `, data)
            csvPipe.pause();
            try {
                processing = true;
                if (name === 'Movies') {
                    // let movieObject = new movie(data)
                    // await movieObject.save()
                    await movie.create(data);
                    console.log(`Done with Saving Record ${recordCount} `, data)
                }
                else if (name === 'User') {
                    const newId = await movie.findOne({movieId:data.movieId},{_id:1})  
                    if(newId){
                        data.movieId=newId._id
                    }
                    await user.create(data);
                }
                else {
                    const newId = await movie.findOne({movieId:data.movieId},{_id:1})  
                    if(newId){
                        data.movieId=newId._id
                    }
                    await critic.create(data);
                }
            }
            catch (e) {
                console.log("Error:", e);
            }
            finally {
                csvPipe.resume();
                processing = false;
            }
        })
            .on('end', () => {
                console.log(`EOF file reached for ${name} Model`);
            })
            .on('error', (error: string) => reject(error))
    })
}