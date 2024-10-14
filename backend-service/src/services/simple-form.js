const formModel = require('../models/simple-form');

exports.findExistForm = async (email, identity_number) => {
    const form = await formModel.findOne({
        $or: [
            { email }, 
            { identity_number }
        ]
    })
    
    return form ? true : false;
}

exports.createForm = (payload) => {
    return formModel.create(payload);
}