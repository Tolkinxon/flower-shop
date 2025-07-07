import Joi from 'joi';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const last_name = Joi.string().max(100).min(3).required().messages({
    'string.base': 'User must be a string.',
    'string.empty': 'Username can not be a empty.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must be no longer than 100 characters.',
    'any.required': 'Username is required' 
});

const first_name = Joi.string().max(100).min(3).required().messages({
    'string.base': 'User must be a string.',
    'string.empty': 'Username can not be a empty.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username must be no longer than 100 characters.',
    'any.required': 'Username is required' 
});

const email = Joi.string().email().pattern(emailPattern).required().messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email can not be a empty.',
    'string.email': 'Please enter a valid email address.',
    'string.pattern.base': 'Email does not match the required pattern.',
    'any.required': 'Email is required' 
});

const phone = Joi.string().required().messages({
    'string.base': 'Phone must be a string.',
    'string.empty': 'Phone can not be a empty.',
    'any.required': 'Phone is required' 
});

const password = Joi.string().max(50).min(3).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password can not be a empty.',
    'string.min': 'Password must be at least 3 characters long.',
    'string.max': 'Password must be no longer than 50 characters.',
    'any.required': 'Password is required' 
});

const role_id = Joi.number().valid(1, 2).messages({
    'any.only': 'Role must be either 1 (Admin) or 2 (Customer).',
    'string.base': 'Role must be a string.',
});

// Categories validate side

const name = Joi.string().max(100).min(3).required().messages({
    'string.base': 'Category name must be a string.',
    'string.empty': 'Category name can not be a empty.',
    'string.min': 'Category name must be at least 3 characters long.',
    'string.max': 'Category name must be no longer than 100 characters.',
    'any.required': 'Category name is required' 
});

// Flowers validate side
let name_flower = Joi.string()
  .max(255)
  .required()
  .messages({
    "string.base": "Flower name must be a string.",
    "string.empty": "Flower name cannot be empty.",
    "string.max": "Flower name must not exceed 255 characters.",
    "any.required": "Flower name is required.",
  })

let color =  Joi.string()
  .max(50)
  .required()
  .messages({
    "string.base": "Color must be a string.",
    "string.empty": "Color cannot be empty.",
    "string.max": "Color must not exceed 50 characters.",
    "any.required": "Color is required.",
  })

let price = Joi.number()
  .positive()
  .precision(2)
  .required()
  .messages({
    "number.base": "Price must be a number.",
    "number.positive": "Price must be a positive value.",
    "number.precision": "Price can have up to 2 decimal places.",
    "any.required": "Price is required.",
  })

let category_id = Joi.number()
  .integer()
  .positive()
  .required()
  .messages({
    "number.base": "Category ID must be a number.",
    "number.integer": "Category ID must be an integer.",
    "number.positive": "Category ID must be a positive number.",
    "any.required": "Category ID is required.",
  })


let image_path =  Joi.string()
  .uri({ allowRelative: true }) 
  .messages({
    "string.base": "Image path must be a string.",
    "string.uri": "Image path must be a valid URL or relative path.",
  })

let import_from = Joi.string()
  .max(255)
  .required()
  .messages({
    "string.base": "Import origin must be a string.",
    "string.empty": "Import origin cannot be empty.",
    "string.max": "Import origin must not exceed 255 characters.",
    "any.required": "Import origin is required.",
  })

let is_active = Joi.boolean()
  .messages({
    "boolean.base": "Is Active must be true or false.",
  });

let description = Joi.string()
  .required()
  .messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description cannot be empty.",
    "any.required": "Description is required.",
  })

let count = Joi.number()
  .integer()
  .min(0)
  .messages({
    "number.base": "Count must be a number.",
    "number.integer": "Count must be an integer.",
    "number.min": "Count cannot be negative.",
  })
const flowerValidator = Joi.object({name:name_flower, color, price, category_id, image_path, import_from, is_active, description, count });

export const createFlowerValidator = (updateData) => {
  let validator = {};
  if(updateData.hasOwnProperty("name")) validator.name = name_flower;
  if(updateData.hasOwnProperty("color")) validator.color = color;
  if(updateData.hasOwnProperty("price")) validator.price = price;
  if(updateData.hasOwnProperty("category_id")) validator.category_id = category_id;
  if(updateData.hasOwnProperty("image_path")) validator.image_path = image_path;
  if(updateData.hasOwnProperty("import_from")) validator.import_from = import_from;
  if(updateData.hasOwnProperty("is_active")) validator.is_active = is_active;
  if(updateData.hasOwnProperty("description")) validator.description = description;
  if(updateData.hasOwnProperty("count")) validator.name = count;
  return Joi.object(validator);
}


const userValidator = Joi.object({ last_name, first_name, email, password, role_id, phone });
const loginValidator = Joi.object({ email, password });
const categoryValidator = Joi.object({ name });
export { userValidator, loginValidator, categoryValidator, flowerValidator };


