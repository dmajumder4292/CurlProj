import * as ErrorUtils from '../commons/utils/ErrorUtils';
import * as AbstractModels from '../models/AbstractModels';
import Client from '../models/Client';
import uuid from 'uuid';

export const loginrequest = async(req,res,next) => {
	try{
        const fullname = req.body.fullname;
        const company = req.body.company;
        const requestId = uuid.v4();
        await AbstractModels.mongoInsert(Client,{fullname, company, requestId, status: "pending"});
        res.send({
            requestId
        })   
	}
	catch(err) {
		console.log('Error in registration : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}

export const loginstatus = async(req,res,next) => {
	try{
        const requestId = req.query.requestId;
        
        let selectCondition = {
        	requestId
        }
        
        let clientObj = await AbstractModels.mongoFindOne(Client,selectCondition);
        if(!clientObj) {
            res.statusCode = 401;
            res.send(ErrorUtils.UserNotFoundError(""));
        } else {
            if(clientObj.status === "approved"){
                res.send({
                    "login":true,
                    "sessiontoken":clientObj.sessiontoken
                });
            } else if (clientObj.status === "rejected") {
                res.send({
                    "login":false,
                    "status": "rejected"
                });
            } else {
                res.send({
                    "login":false
                });
            }
        }
	}
	catch(err) {
		console.log('Error in login : ',err);
		res.send(ErrorUtils.InternalServerError(err));
	}
}