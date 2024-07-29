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

export const readCSVFile  = async <T>(filepath:string): Promise<T[]> => {
    return new Promise((resolve,reject) => {
        const results:T[] = [];
        const stream = fs.createReadStream(filepath)
        stream.pipe(csv()).on('data',(data:any)=>results.push(data))
                          .on('end',()=>resolve(results))
                          .on('error',(error:string)=>reject(error))
         })       
}

export const InsertData = async<T>(data : T[], name: string) => {
    let item: T;
    let newItem;
    for(item of data){
        if(name==='Movies'){
            newItem = new movie(item);
        }
        else if(name==='User'){
            newItem = new user(item);
        }
        else{
            newItem = new critic(item);
        }
        if(newItem) await newItem.save();
    }
    console.log(`Data inserted succesfully into ${name} Model`);
}