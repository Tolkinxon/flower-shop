import { ClientError, globalError } from "shokhijakhon-error-handler";
import { db } from "../lib/connection.js";

class categoryController {
    async CREATE_CATEGORY(req, res){
        try {
            const category = req.body;
            const [[findCategory]] = await db.query(`SELECT * FROM category WHERE name=?`, [category.name]);
            if(findCategory) throw new ClientError('This category already exists!');
            const [categoryData] = await db.query(`INSERT INTO category(name) VALUES (?)`, [category.name]);
            res.json({message: 'Category successfully added', status: 201 });         
        } catch (error) { 
            globalError(error, res);
        }
    };

    async DELETE(req, res){
        try {
            const id = req.params.id;
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

export default new categoryController();