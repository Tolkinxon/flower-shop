import { ClientError, globalError } from "shokhijakhon-error-handler";
import {tokenService} from"../lib/tokenService.js";
const { verifyToken } = tokenService;
import { db } from "../lib/connection.js";

 async function checkToken(req, res, next){
    try {
        const token = req.headers.token;
        if(!token) throw new ClientError('Unauthorized!', 400);
        const verifiyToken = verifyToken(token);
        if(!(req.headers['user-agent'] == verifiyToken.userAgent)) throw new ClientError('Unauthorized!', 400);
        const [[user]] = await db.query("SELECT * FROM users WHERE id=?", verifiyToken.user_id);
        if(!user) throw new ClientError('Unauthorized!', 401);
        if(user.role_id == 1) req.admin = true;
        else {req.admin = false;}
        return next();
    } catch (error) {
        globalError(error, res);        
    }
}

export default checkToken;