import { ClientError, globalError } from "shokhijakhon-error-handler";
import { fetchQuery, transaction } from "../lib/connection.js";

class PaymentController{
    async CREATE_PAYMENT(req, res){
        try{
            let {id} = req.params;
            const {amount} = req.body
            let findOrder = await fetchQuery(`SELECT * FROM orders WHERE id=? and customer_id=?`, true, id, req.user_id);
            if(!findOrder) throw new ClientError('Order not found', 404);
            console.log(amount);
            
            let paymentTransaction = await transaction(async (conn) => { 
                if(findOrder.total_price > amount) throw new ClientError('Payment in smal than total price', 400);
                let [payment] = await conn.query(`INSERT INTO payments (order_id, amount) VALUES (?, ?)`,[id,  amount]);
                await conn.query(`UPDATE orders SET status_id = 2 WHERE id = ? AND customer_id`, [id, req.user_id]);
                return {payment_id: payment.id}
            });
            return res.status(201).json({message: "Payment completed successfully !", status: 201, id: await paymentTransaction.payment_id})
        }catch(err){
            return globalError(err, res);
        }
    }
}

export default new PaymentController();