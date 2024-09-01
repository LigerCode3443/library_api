import Joi from "joi";

export const bookAddSchema = Joi.object({
  isbn: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  isBorrowed: Joi.boolean().default(false),
});

export const bookUpdateSchema = Joi.object({
  isbn: Joi.string(),
  title: Joi.string(),
  author: Joi.string(),
  isBorrowed: Joi.boolean(),
});
