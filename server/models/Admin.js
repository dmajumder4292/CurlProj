import mongoose from 'mongoose';
import {Schema} from 'mongoose';

import * as mongoConnect from '../connections/mongoConnect';
var mainDb = mongoConnect.mainDb;

let AdminSchema = new Schema({
    password: {
        type: String        
    },
    first_name: {
        type: String
    },
    last_name: {
        required: false,
        type: String
    },
    username: {
      type: String  
    },
    user_type:{
        type: String,
        required: true
    },
    sessiontoken : {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


let Admin = mainDb.model('Admin', AdminSchema, 'Admin');
export default Admin;