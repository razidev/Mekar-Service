const { simpleFormSchema } = require('./schema')

const FormValidator = {
    validatePostSimpleForm: (payload) => {
        const { error, value } = simpleFormSchema.validate(payload);
        if (error) {
            let message = error.details[0].message;
            if (error.details[0].context.label === 'date_of_birth') {
                message = 'Date of birth should be in the format YYYY-MM-DD';
            }
            const errors = new Error(message);
            errors.statusCode = 400;
            throw errors;
        }
        return value;
    }
};

module.exports = FormValidator;