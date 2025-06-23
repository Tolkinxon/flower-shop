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

const password = Joi.string().max(50).min(3).required().messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password can not be a empty.',
    'string.min': 'Password must be at least 3 characters long.',
    'string.max': 'Password must be no longer than 50 characters.',
    'any.required': 'Password is required' 
});

const role = Joi.string().valid('1', "2").required().messages({
    'any.only': 'Role must be either 1 (Admin) or 2 (Customer).',
    'any.required': 'Role is required field.',
    'string.base': 'Role must be a string.',
});


const userValidator = Joi.object({ last_name, first_name, email, password, role });
const loginValidator = Joi.object({ email, password });
export { userValidator, loginValidator };


