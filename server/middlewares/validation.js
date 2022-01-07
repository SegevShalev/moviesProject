//validation
const Joi = require("@hapi/joi");

//register validation

const regitserValidation = (data) => {
  const schema = Joi.object({
    name:Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
      name:Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
  };



module.exports = {regitserValidation,loginValidation};