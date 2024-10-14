const { validatePostSimpleForm } = require('../validator');
const formService = require('../services/simple-form');

exports.postSimpleForm = async (req, res, next) => {
    try {
        const input = validatePostSimpleForm(req.body);
        const { identity_number, email } = input;

        const findExistForm = await formService.findExistForm(email, identity_number);
        if (findExistForm) {
            const error = new Error('Form Already Exists');
            error.statusCode = 400;
            throw error;
        }

        const newForm = await formService.createForm(input);
        return res.status(201).json({
            status: 'success',
            message: 'Form Submitted Successfully',
            form: newForm,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        return next(error);
    }
};