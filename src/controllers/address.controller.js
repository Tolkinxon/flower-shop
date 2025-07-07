import { ClientError, globalError } from "shokhijakhon-error-handler";
import { addressValidator, createAddressValidator } from "../utils/validator.js";
import { fetchQuery } from "../lib/connection.js";

class AddressController {
    async CREATE_ADDRESS(req, res){
        try {
            let newAddress = req.body;
            const validate = addressValidator.validate(newAddress, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            let checkAddress = await fetchQuery('SELECT * FROM address WHERE name=? and region=? and city=? and street=? and customer_id=?', true, newAddress.name, newAddress.region, newAddress.city, newAddress.street, req.user_id);
            if(checkAddress) throw new ClientError('Address already exists!', 400);
            newAddress.customer_id = req.user_id;
            const keys = Object.keys(newAddress);
            const values = Object.values(newAddress);
            const insertionKeys = keys.map(item => item + '=?').join(',');
            const insertAddress = await fetchQuery(`INSERt INTO address SET ${insertionKeys}`, false, ...values);
            res.status(201).json({message: "Address successfully added", status: 201, addressId: insertAddress.insertId});
        } catch (error) {
            globalError(error, res);
        }
    }
    async GET_ADDRESS(req, res){
        try {
            const id = req.params.id;
            if(id){
                const address = await fetchQuery(`SELECT a.name, a.region, a.city, a.street, CONCAT(U.first_name, " ", u.last_name) as customer_full_name  FROM address a
                                                 INNER JOIN users u ON u.id=a.customer_id WHERE a.id = 1 AND a.customer_id=1;`, true, id, req.user_id);
                if(!address) throw new ClientError('Flower not found!', 404);
                res.json(address)
            }
               const addresses = await fetchQuery(`SELECT a.name, a.region, a.city, a.street, CONCAT(U.first_name, " ", u.last_name) as customer_full_name  FROM address a
                                                 INNER JOIN users u ON u.id=a.customer_id WHERE a.customer_id=1;`, false, req.user_id);
                
            res.json(addresses);
        } catch (error) {
            globalError(error, res);
        }
    }
    async UPDATE(req, res){
        try {
            const id = req.params.id;
            let address = req.body;
            const findAddress = await fetchQuery(`SELECT * FROM address WHERE id=? AND customer_id`, true, id, req.user_id);
            if(!findAddress) throw new ClientError("Not found!", 404);
            const makeValidator = createAddressValidator(address);
            const validate = makeValidator.validate(address, {abortEarly:true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
       
            const keys = Object.keys(address); 
            const values = Object.values(address);
            const insertionKeys = keys.map(item => item + '=?').join(',');
            await fetchQuery(`UPDATE address SET ${insertionKeys} WHERE id=? AND customer_id=?`, false, ...values, id, req.user_id);
            res.status(200).json({ message: "Address successfully updated", status: 200 });
        } catch (error) {
            globalError(error, res);
        }
    };
    async DELETE(req, res){
        try {
            const id = req.params.id;
            let address = req.body;
            const findAddress = await fetchQuery(`SELECT * FROM address WHERE id=? AND customer_id`, true, id, req.user_id);
            if(!findAddress) throw new ClientError("Not found!", 404);
            await fetchQuery('DELETE FROM address WHERE id=? AND customer_id', false, id, req.user_id)
            res.status(200).json({ message: "Address successfully deleted", status: 200 });
        } catch (error) {
            globalError(error, res)
        }
    }
    
}

export default new AddressController();