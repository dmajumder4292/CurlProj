import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import * as mongoConnect from '../connections/mongoConnect';
var mainDb = mongoConnect.mainDb;

let ClientSchema = new Schema({
    fullname: {
        type: String
    },
    company: {
        type: String
    },
    requestId: {
        type: String
    },
    status: {
        type: String
    },
    sessiontoken : {
        type: String
    },
});


let Client = mainDb.model('Client', ClientSchema, 'Client');
export default Client;