import { readCSVFile, readFiles } from "./Data/readData";
import { getRatings } from "./Query/query1";
import {connect} from './Config/connect'

const main = async () => {
    await connect();
    try {
        const { movieData, userData, criticData } = readFiles();
        // const res = await getRatings("Seven Samurai");
        // console.log(res);
        // if (movieData) {
        //     await readCSVFile(movieData, 'Movies');       
        // }
        // if (criticData) {
        //     await readCSVFile(criticData, 'Critic');
        // }
        // if (userData) {
        //     await readCSVFile(userData, 'User');
        // }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

main();