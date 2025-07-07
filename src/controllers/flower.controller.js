import { ClientError, globalError } from "shokhijakhon-error-handler";
import { db, fetchQuery } from "../lib/connection.js";
import { createFlowerValidator, flowerValidator } from "../utils/validator.js";
import { flowerImageUploadFn } from "../utils/upload.cloudinary.js";
import cloudinary from "cloudinary";



class FlowerController {
    async CREATE_FLOWER(req, res){
        try {
            const newFlower = req.body;
            const validate = flowerValidator.validate(newFlower, {abortEarly: true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            const foundFlower = await fetchQuery('SELECT * FROM flowers WHERE category_id=? AND name=?', true, newFlower.category_id, newFlower.name);
            if(foundFlower) throw new ClientError("This flower already exists!", 400);
             const flowerImage = await flowerImageUploadFn(req.file);
             newFlower.image_path = flowerImage.secure_url;
             newFlower.public_id = flowerImage.public_id;
             const keys = Object.keys(newFlower);
             const values = Object.values(newFlower);
             const insertionKeys = keys.map(item => item + '=?').join(',');
             const insertFlower = await fetchQuery(`INSERt INTO flowers SET ${insertionKeys}`, false, ...values);
             res.status(201).json({message: "Image successfully uploaded", status: 201, flowerId: insertFlower.insertId});
        } catch (error) { 
            globalError(error, res);
        }
    };

    async DELETE(req, res){
        try {
            const id = req.params.id;
            const findFlower = await fetchQuery(`SELECT * FROM flowers WHERE id=?`, true, id);
            if(!findFlower) throw new ClientError("Not found!", 404);
            await cloudinary.v2.uploader.destroy(findFlower.public_id);
            await fetchQuery(`DELETE FROM flowers WHERE id=?`, false, id);
            res.status(200).json({ message: "Image successfully deleted", status: 200 });
        } catch (error) {
            globalError(error, res);
        }
    };

    async UPDATE(req, res){
        try {
            const id = req.params.id;
            let flower = req.body;
            flower = {...flower};
            const findFlower = await fetchQuery(`SELECT * FROM flowers WHERE id=?`, true, id);
            if(!findFlower) throw new ClientError("Not found!", 404);
            const makeValidator = createFlowerValidator(flower);
            const validate = makeValidator.validate(flower, {abortEarly:true});
            if(validate.error) throw new ClientError(validate.error.message, 400);
            if(req.file) { 
                 await cloudinary.v2.uploader.destroy(findFlower.public_id);
                const flowerImage = await flowerImageUploadFn(req.file);
                flower.image_path = flowerImage.secure_url;
                flower.public_id = flowerImage.public_id;
            }
            const keys = Object.keys(flower); 
            const values = Object.values(flower);
            const insertionKeys = keys.map(item => item + '=?').join(',');
            await fetchQuery(`UPDATE flowers SET ${insertionKeys} WHERE id=?`, false, ...values, id);
            res.status(200).json({ message: "Image successfully updated", status: 200 });
        } catch (error) {
            globalError(error, res);
        }
    };

    async GET_FLOWER(req, res){
        try {
            const id = req.params.id;
            if(id){
                const flower = await fetchQuery(`SELECT f.name, f.description, f.import_from, f.color, f.price, f.count, c.name as category_name FROM flowers f
                                                 LEFT JOIN category c ON f.category_id=c.id WHERE f.id=?`, true, id);
                if(!flower) throw new ClientError('Flower not found!', 404);
                res.json(flower)
            }
            const flowers = await fetchQuery(`SELECT f.name, f.description, f.import_from, f.color, f.price, f.count, c.name as category_name FROM flowers f
                                              LEFT JOIN category c ON f.category_id=c.id;`);
            res.json(flowers);
        } catch (error) {
            globalError(error, res);
        }
    }
};

export default new FlowerController();