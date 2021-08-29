import config from '../config/index.js';
import mongoose from 'mongoose';

export const mainDb =  mongoose.createConnection(config.dbconfig.conn_string);
if(mainDb){
	console.log("Config ",config.dbconfig.conn_string)
}
else{
	console.log("Unable to connect to mainDb")
}