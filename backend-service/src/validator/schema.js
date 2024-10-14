const Joi = require('joi');

const simpleFormSchema = Joi.object({
    name: Joi.string().trim().min(4).max(50).required(),
    identity_number: Joi.string().trim().min(10).max(16).required(),
    email: Joi.string().email().required(),
    date_of_birth: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required()
});

module.exports = { simpleFormSchema };