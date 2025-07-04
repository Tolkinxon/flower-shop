import { ClientError, globalError } from "shokhijakhon-error-handler";
import { fetchQuery } from "../lib/connection.js";
import { tokenService } from "../lib/tokenService.js";
import { hashService } from "../lib/hash.js";
import { loginValidator, userValidator } from "../utils/validator.js";

class AuthController {
    async REGISTER(req, res){
        try {
            const newUser = req.body;
            const validator = userValidator.validate(newUser, {abortEarly: true});
            if(validator.error) throw new ClientError(validator.error.message, 400);
            const findUser = await fetchQuery(`SELECT email FROM users WHERE email=?`,true, newUser.email);
            if(findUser) throw new ClientError('This user already exists!');

            if(newUser.role_id && newUser.role_id == 1) throw new ClientError('Forbidden !', 403);
            newUser.password = await hashService.createHash(newUser.password)
            newUser.role_id = newUser.role_id || 2;
            const userData = await fetchQuery(`INSERT INTO users(first_name, last_name, phone, email, password, role_id) VALUES (?,?,?,?,?,?)`, false,
                  newUser.first_name, newUser.last_name, newUser.phone, newUser.email, newUser.password, newUser.role_id);
            res.json({message: 'User successfully added', status: 201, accessToken: tokenService.createToken({user_id:userData.insertId, userAgent: req.headers['user-agent']})});         
            
        } catch (error) { 
            globalError(error, res);
        }
    };

    async LOGIN(req, res){
        try {
            const user = req.body;
            const validator = loginValidator.validate(user, {abortEarly: true});
            if(validator.error) throw new ClientError(validator.error.message, 400);
            const admins = await fetchQuery(`SELECT * FROM users WHERE role_id = 1`);
            const foundAdmin = admins.find(admin => admin.email == user.email && hashService.comparePassword(user.password, admin.password));
            if(foundAdmin) return res.json({message: "Admin successfully logged", status: 200, accessToken: tokenService.createToken({user_id: foundAdmin.id, admin:true, userAgent: req.headers['user-agent']})});

            const findUser = await fetchQuery("SELECT * FROM users WHERE email=?", true,  user.email);
            if(!findUser && !(await hashService.comparePassword(user.password, findUser.password))) throw new ClientError("This user not found"); 
            return res.json({message: "Customer successfully logged", status: 200, accessToken: tokenService.createToken({user_id: findUser.id, userAgent: req.headers['user-agent']})})
        } catch (error) {
            globalError(error, res);
        }
    };

    async DELETE(req, res){
        try {
            const id = req.params.id;
            const findUser = await fetchQuery(`SELECT id FROM users WHERE id=?`,false, id);
            if(findUser) {
                await fetchQuery(`DELETE FROM users WHERE id = ?`, false,id);
                return res.json({message: "User successfully deleted"});
            } throw new ClientError('This user is not available');
        } catch (error) {
            globalError(error, res);
        }
    };

    async UPDATE(req, res){
        try {
            const id = req.params.id;
            const user = req.body;
            let findUser = await fetchQuery(`SELECT * FROM users WHERE id=?`,true, id);
            if(findUser) {
                if(user.password) user.password = await hashService.createHash(user.password);
                findUser = {...findUser,...user}
                await fetchQuery(`UPDATE users SET first_name = ?, last_name = ?, phone=?, email=?, password=? WHERE id = ?`, false, 
                                findUser.first_name, findUser.last_name, findUser.phone, findUser.email, findUser.password, findUser.id);
                return res.json({message: "User successfully updated"});
            } throw new ClientError('This user is not available');
        } catch (error) {
            globalError(error, res);
        }
    };

    async GET_All(req, res){
        try {
            const users = await fetchQuery('SELECT * FROM users');
            res.json({message: "All users are here", status: 200, users});
            
        } catch (error) {
            globalError(error, res)
        }
    }

    async ADD_ADMIN(req, res){
        try {
            const newUser = req.body;
            const validator = userValidator.validate(newUser, {abortEarly: true});
            if(validator.error) throw new ClientError(validator.error.message, 400);
            if(!(newUser.role-id && newUser.role_id == 2)) throw new ClientError("Forbidden !", 403);
            const findUser = await fetchQuery(`SELECT email FROM users WHERE email=?`, true, newUser.email);
            if(findUser) throw new ClientError('This user already exists!');
            const userData = await fetchQuery(`INSERT INTO users(first_name, last_name, phone, email, password, role_id) VALUES (?,?,?,?,?,?)`, false, 
                  newUser.first_name, newUser.last_name, newUser.phone, newUser.email, await hashService.createHash(newUser.password), newUser.role_id);
            res.json({message: 'Admin successfully added', status: 201, accessToken: tokenService.createToken({user_id:userData.insertId, userAgent: req.headers['user-agent']})});         
        } catch (error) { 
            globalError(error, res);
        }
    };
};

export default new AuthController();