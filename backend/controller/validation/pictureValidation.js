const joi = require('joi');


exports.createValidation = (data) => {
    const schema = joi.object({
        picture: joi.string(),
        subtitle: joi.string().required(),
        category: joi.string().valid("nature", "portrait", "animal", "travel", "architecture", "people", "galaxy", "sport").required(),
        user: joi.string(),
        like: joi.string()
    })
    return schema.validate(data);
}

exports.editValidation = (data) => {
    const schema = joi.object({
        picture: joi.string(),
        subtitle: joi.string().required(),
        category: joi.string().valid("nature", "portrait", "animal", "travel", "architecture", "people", "galaxy", "sport").required(),
    })
    return schema.validate(data);
}