import { ClientError, globalError } from "shokhijakhon-error-handler";
import { fetchQuery } from "../lib/connection.js";
import { categoryValidator } from "../utils/validator.js";

class categoryController {
    async CREATE_CATEGORY(req, res){
        try {
            const category = req.body;
            const validate = categoryValidator.validate(category);
            if(validate.error) throw new ClientError(validate.error.message, 404);
            const findCategory = await fetchQuery(`SELECT * FROM category WHERE name=?`, true, category.name);
            if(findCategory) throw new ClientError('This category already exists!', 404 );
            const categoryData = await fetchQuery(`INSERT INTO category SET name=?;`,false, category.name);
            res.status(201).json({message: 'Category successfully added', status: 201, categoryId: categoryData.insertId });         
        } catch (error) { 
            globalError(error, res);
        }
    };

    async GET_CATEGORY(req, res){
        try {
            const id = req.params.id;
            if(id){
                const category = await fetchQuery('SELECT * FROM category WHERE id=?', true, id);
                if(!category) throw new ClientError('Category not found!', 404);
                res.json(category)
            }
            const categories = await fetchQuery('SELECT * FROM category');
            res.json(categories);
        } catch (error) {
            globalError(error, res);
        }
    }

    async DELETE(req, res){
        try {
            const id = req.params.id;
            const findCategory = await fetchQuery(`SELECT id FROM category WHERE id=?`,false, id);
            if(!findCategory) throw new ClientError('This category not found', 404);
            await fetchQuery(`DELETE FROM category WHERE id = ?`, false, id);
            return res.json({message: "Category successfully deleted", status:200});
        } catch (error) {
            globalError(error, res);
        }
    };

    async UPDATE(req, res){
        try {
            const id = req.params.id;
            const category = req.body;
            const findCategory = await fetchQuery(`SELECT * FROM category WHERE id=?`, true, id);
            if(!findCategory) throw new ClientError('This category is not found');
            const validate = categoryValidator.validate(category);
            if(validate.error) throw new ClientError(validate.error.message, 404);
            const findCategoryByName = await fetchQuery(`SELECT * FROM category WHERE name=?`, true, category.name);
            if(findCategoryByName) throw new ClientError("This category alredy exists", 400);
            await fetchQuery(`UPDATE category SET name=? WHERE id = ?`,false, category.name, id);
            return res.json({message: "Category successfully updated", status: 200});
        } catch (error) {
            globalError(error, res);
        }
    };
};

export default new categoryController();