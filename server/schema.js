const Joi = require("joi");

// Schema for new user validation
module.exports.newUserSchema = Joi.object({
  username: Joi.string().max(16).required().messages({
    "string.base": "Username must be a string",
    "string.max": "Username length should not be greater than 16",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "It's not a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, one special character",
      "string.min": "Password must be at least 8 characters long",
      "any.required": "Password is required",
    }),
  name: Joi.string().max(30).required().messages({
    "string.base": "Name must be a string",
    "string.max": "Name should not be more than 30 characters",
    "any.required": "Name is required",
  }),
  referredBy: Joi.string().min(5).max(5).allow("").messages({
    "string:base": "Referral Code Must Be String",
    "string.max": "Referral should not be more than 5 characters",
    "string.min": "Referral Code must be at least 5 characters long",
  }),
});

// Joi schema for existing user validation
module.exports.existingUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});
