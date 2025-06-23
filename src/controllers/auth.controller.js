import { ClientError, globalError } from "shokhijakhon-error-handler";
import { db } from "../lib/connection.js";

class AuthController {
    async REGISTER(req, res){
        try {
            const newUser = req.body;
            const [[findUser]] = await db.query(`SELECT email, password FROM users WHERE email=?`, [newUser.email]);
                     
            
        } catch (error) { 
            globalError(error, res);
        }
    };

    async LOGIN(req, res){
        try {
            const user = req.body;
            const [[findUser]] = await db.query(`SELECT email, password, role_id FROM users WHERE email=?`, [user.email]);
            if(findUser){
                if(user.password == 'tolkinxon123' && user.email == 'tolkinxon@gmail.com' && findUser.role_id == 1){
                    return res.json({message: "Admin successfully logged", status: 200})
                } else {
                    return res.json({message: "Customer successfully logged", status: 200})
                }

            } throw new ClientError('User not found', 404)
            
        } catch (error) {
            globalError(error, res);
        }
    }
};

export default new AuthController();