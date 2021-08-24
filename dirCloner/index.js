const fileTester = require('./loop-copy');
require('dotenv').config();

const from = process.env.DIR_FROM;
const to = process.env.DIR_TO;

fileTester.dirCloneSync(from, to); 


