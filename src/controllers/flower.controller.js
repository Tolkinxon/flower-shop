import { ClientError, globalError } from "shokhijakhon-error-handler";
import { db } from "../lib/connection.js";

class FlowerController {
    async CREATE_FLOWER(req, res){
        try {
            const flower = req.body;

                   
            // const [flowerData] = await db.query(`INSERT INTO flowers(name, color, price, category_id, image_path, import_from,  is_active, update_img_id, description, count) VALUES (?, )`, [category.name]);
            // res.json({message: 'Category successfully added', status: 201 });         
            
        } catch (error) { 
            globalError(error, res);
        }
    };

    async DELETE(req, res){
        try {
            const id = req.params.id;
            console.log(id);
            
            const [[findCategory]] = await db.query(`SELECT id FROM category WHERE id=?`, [id]);
            if(findCategory) {
                await db.query(`DELETE FROM category WHERE id = ?`, [id]);
                return res.json({message: "Category successfully deleted", status:200});
            } throw new ClientError('This category not found', 404);
        } catch (error) {
            globalError(error, res);
        }
    };

    async UPDATE(req, res){
        try {
            const id = req.params.id;
            const category = req.body;
            const [[findCategory]] = await db.query(`SELECT * FROM category WHERE id=?`, [id]);
            if(findCategory) {
                await db.query(`UPDATE category SET name=? WHERE id = ?`, [category.name, id]);
                return res.json({message: "Category successfully updated"});
            } throw new ClientError('This category is not found');
        } catch (error) {
            globalError(error, res);
        }
    };
};

export default new FlowerController();