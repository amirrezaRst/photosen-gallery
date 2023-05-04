const joi = require('joi');

exports.newContactValidation = (data) => {
    const schema = joi.object({
        fullName: joi.string().required(),
        email: joi.string().required(),
        subject: joi.string().required(),
        message: joi.string().required(),
        answering: joi.boolean().default(false)
    });
    return schema.validate(data);
}