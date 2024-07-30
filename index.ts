import { processCSVFile, readFiles } from "./Data/readData";
import {connect} from './Config/connect'

const main = async () => {
    await connect();
    try {
        const { movieData, userData, criticData } = readFiles();
        // if (movieData) {
        //     const msg = await processCSVFile(movieData, 'Movies'); 
        //     console.log(msg);
        //     console.log("Movies Insertion done")
        // }
        // if (criticData) {
        //     const msg = await processCSVFile(criticData, 'Critic');
        //     console.log(msg);
        //     console.log("Critics Insertion done")
        // }
        if (userData) {
            const msg = await processCSVFile(userData, 'User');
            console.log(msg);
            console.log("Users Insertion done")
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

main();