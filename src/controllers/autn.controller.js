import { globalError } from "shokhijakhon-error-handler";

class AuthController {
    REGISTER(req, res){
        try {
            const newUser = req.body;
            
        } catch (error) {
            globalError(error, res);
        }
    }
};

export default new AuthController();