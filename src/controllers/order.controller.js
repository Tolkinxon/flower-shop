import { globalError } from "shokhijakhon-error-handler";

class OrderController{
    async CREATE_ORDER(req, res){
        try {
            const newOrder = req.body;
            
        } catch (error) {
            globalError(error, res);
        }
    }
}


export default new OrderController();