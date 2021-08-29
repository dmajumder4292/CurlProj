import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import Admin from '../models/Admin';
import Client from '../models/Client';
import * as Auth from '../middlewares/Auth';
import * as EncryptionService from '../services/EncryptionService';

export const register = async(req,res,next) => {
	try{
        const username = req.body.username;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;

        let selectCondition = {
        	username
        }
        let adminObj = await AbstractModels.mongoFindOne(Admin,selectCondition);
        if(adminObj) {
            res.statusCode = 401;
            res.send(ErrorUtils.DataAlreadyExists());
        } else {
            let bcryptedPassword = await EncryptionService.generateBcryptPassword(password);
            adminObj = {
                "first_name":first_name,
                "last_name":last_name,
                "password" :bcryptedPassword,
                "username":username,
                "user_type":"admin"                
            }
            await AbstractModels.mongoInsert(Admin,adminObj);
            delete adminObj.password;
            req = Auth.create_session_obj(req,adminObj); 
            res.send({
                "user_details":adminObj,
                "sessiontoken":req.session
            })   
        }
	}
	catch(err) {
		console.log('Error in registration : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}

export const login = async(req,res,next) => {
	try{
        const username = req.body.username;
        const password = req.body.password;
        let selectCondition = {
        	username
        }
        let projectCondition = {
            "_id":0,
        	"first_name":1,
            "last_name":1,
            "password":1
        }
        let adminObj = await AbstractModels.mongoFindOne(Admin,selectCondition,projectCondition);
        if(!adminObj) {
            res.statusCode = 401;
            res.send(ErrorUtils.UserNotFoundError(""));
        } else {
            let bcryptedPassword = adminObj.password;
            let isValid = EncryptionService.compareBcryptPassword(password,bcryptedPassword);
            if(!isValid) {
                res.statusCode = 401;
                res.send(ErrorUtils.InvalidPasswordError(""));
            } else {
                delete adminObj.password;
                adminObj.user_type = "user";
                req = Auth.create_session_obj(req,adminObj);
                res.send({
                    "user_details":adminObj,
                    "sessiontoken":req.session
                });       
            }
        }
	}
	catch(err) {
		console.log('Error in login : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}

export const getAllPendingRequests = async(req,res,next) => {
	try{
        let selectCondition = {
        	status: "pending"
        }
        let projectCondition = {
            "_id":0,
        	"fullname":1,
            "company":1,
            "requestId":1
        }
        let clientsObj = await AbstractModels.mongoFind(Client,selectCondition,projectCondition);
        if(!clientsObj) {
            res.statusCode = 401;
            res.send(ErrorUtils.UserNotFoundError(""));
        } else {
            res.send({
                "requests":clientsObj
            });       
        }
	}
	catch(err) {
		console.log('Error in login : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}

export const updateStatus = async(req,res,next) => {
	try{
        const requestId = req.body.requestId;
        const action = req.body.action;

        let selectCondition = {
        	requestId
        }

        req = Auth.create_session_obj(req,{requestId});

        let updateCondition = {
            status: action,
            sessiontoken: req.session
        }
        await AbstractModels.mongoUpdateOne(Client,selectCondition,updateCondition);
        res.send({
            "ok":true
        });       
	}
	catch(err) {
		console.log('Error in login : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}