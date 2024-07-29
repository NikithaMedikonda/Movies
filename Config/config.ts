import nconf from 'nconf';
import path from 'path';

nconf.argv()
    .env()
    .file(path.join(__dirname, 'paths.json'));

export default nconf;