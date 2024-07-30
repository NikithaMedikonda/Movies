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

const insertRow = async (data: any, name: string) => {
    try {
        if (name === 'Movies') { 
            await movie.create(data); 
        } else if (name === 'User') {
            const newId = await movie.findOne({movieId:data.movieId},{_id:1})  
            if(newId){
                data.movieId=newId._id
            }
            await user.create(data); 
        } else  {
            const newId = await movie.findOne({movieId:data.movieId},{_id:1})  
            if(newId){
                data.movieId=newId._id
            }
            await critic.create(data); 
        }      
    }
    catch (error) {
        console.error(`Error inserting into ${name}:`, error);
    }
}

export const processCSVFile = async (filepath: string, name: string) => {
      return new Promise((resolve, reject) => {
        const stream =  fs.createReadStream(filepath)
         stream.pipe(csv()).on('data', async (data: any) => {await insertRow(data, name);})
                          .on('end', () => {resolve('CSV file processed successfully');})
                          .on('error', (error) => {reject(error);});
      });

}
