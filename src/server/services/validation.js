const joi = require('joi');


exports.validateUser = (user, registered) => {

  let schema;

  if (registered) {
    schema = {
      email: joi.string().min(5).max(255).required().email(),
      password: joi.string().min(3).max(255).required(),
    }
  } else {
    schema = {
      name: joi.string().min(3).max(50).required(),
      email: joi.string().min(5).max(255).required().email(),
      password: joi.string().min(3).max(255).required(),
      role: joi.string().required(),
      image: joi.string().optional(),
    }
  }

  return joi.validate(user, schema);
}