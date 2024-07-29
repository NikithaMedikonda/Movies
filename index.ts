import { readCSVFile, readFiles, InsertData } from "./Data/readData";
import {connect} from './Config/connect'

const main = async() => {
    connect();
    const {movieData,userData,criticData} = readFiles();
    const movies = await readCSVFile(movieData);
    const user = await readCSVFile(userData);
    const critics = await readCSVFile(criticData);
    // InsertData(movies,'Movies');
    // InsertData(user, 'User');
    // InsertData(critics,'critics');
}
main();