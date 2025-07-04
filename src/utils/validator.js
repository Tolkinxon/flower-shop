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

const name = Joi.string().max(100).min(3).required().messages({
    'string.base': 'Category name must be a string.',
    'string.empty': 'Category name can not be a empty.',
    'string.min': 'Category name must be at least 3 characters long.',
    'string.max': 'Category name must be no longer than 100 characters.',
    'any.required': 'Category name is required' 
});


const userValidator = Joi.object({ last_name, first_name, email, password, role_id, phone });
const loginValidator = Joi.object({ email, password });
const categoryValidator = Joi.object({ name });
export { userValidator, loginValidator, categoryValidator };


