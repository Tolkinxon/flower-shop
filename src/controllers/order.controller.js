import { globalError, ClientError } from "shokhijakhon-error-handler";
import { fetchQuery, transaction } from "../lib/connection.js";
import { addressIdValidator, orderItemValidator } from "../utils/validator.js";

class OrderController{
async CREATE_ORDER(req, res) {
    try {
      let order = req.body;
      let validate = addressIdValidator.validate({ address_id: order.address_id });
      if (validate.error) throw new ClientError(validate.error.message, 400);
      const addressChecking = await fetchQuery('SELECT * FROM address WHERE customer_id=? AND id = ?', true, req.user_id, order.address_id);
      if (!addressChecking) throw new ClientError("Address not found", 404);
      if (!Array.isArray(order.items) || order.items.length === 0) throw new ClientError("Order items are required", 400);
      const orderTransaction = await transaction(async (conn) => {
        let totalPrice = 0;
        for (let item of order.items) {
          let validate = orderItemValidator.validate(item, { abortEarly: true });
          if (validate.error) throw new ClientError(validate.error.message, 400);
          const [[flower]] = await conn.query(`SELECT * FROM flowers WHERE id=?`, [item.flower_id]);
          if (!flower) throw new ClientError("Flower not found", 404);
          if (flower.count < item.quantity) throw new ClientError(`Only ${flower.count} items left for flower ID ${item.flower_id}`, 400);
          totalPrice += flower.price * item.quantity;
          await conn.query(`UPDATE flowers SET count = count - ? WHERE id = ?`, [item.quantity, item.flower_id]);
        }
        const [insertOrderResult] = await conn.query(
          `INSERT INTO orders (customer_id, total_price, address_id, status_id) VALUES (?, ?, ?, ?)`,
          [req.user_id, totalPrice, order.address_id, 1]
        );

        const order_id = insertOrderResult.insertId;

        for (let item of order.items) {
          await conn.query(
            `INSERT INTO order_details (order_id, flower_id, quantity) VALUES (?, ?, ?)`,
            [order_id, item.flower_id, item.quantity]
          );
        }

        return { order_id, total_price: totalPrice };
      }, res);

      return res.status(201).json({message: "Order successfully created!", status: 201, order: { ...orderTransaction }});
    } catch (err) {
      return globalError(err, res);
    }
  }
  async ORDER_CANCEL(req, res){
    try{
        let {id} = req.params;
        console.log(id, req.user_id);
        
        let findOrder = await fetchQuery(`SELECT * FROM orders WHERE id=? AND customer_id=?`, true, id, req.user_id);
        if(!findOrder) throw new ClientError('Order not found', 404);
        await fetchQuery(`UPDATE orders SET status_id=? WHERE id=? AND customer_id=?`, false, 3, id, req.user_id);
        return res.json({message: "Order successfully cenceled !", status: 200});
    }catch(err){
        return globalError(err, res);
    }
  }
}


export default new OrderController();