const joi = require('joi');


exports.registerValidation = (data) => {
    const schema = joi.object({
        fullName: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
        profileImage: joi.string(),
        avatar: joi.string()
    })
    return schema.validate(data);
}

exports.loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().trim().required(),
        password: joi.string().trim().required()
    })
    return schema.validate(data);
}

exports.newUserValidation = (data) => {
    const schema = joi.object({
        fullName: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
        profileImage: joi.string(),
        role: joi.string().required(),
        avatar: joi.string()
    })
    return schema.validate(data);
}

exports.forgotValidation = (data) => {
    const schema = joi.object({
        email: joi.string().required()
    })
    return schema.validate(data);
}

exports.passwordValidation = (data) => {
    const schema = joi.object({
        password: joi.string().trim().required(),
        confirmPassword: joi.string().trim().required()
    })
    return schema.validate(data);
}