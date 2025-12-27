import Joi from "joi";

const createBookValidation = Joi.object({
  title: Joi.string().max(255).required(),
  author: Joi.string().max(100).optional(),
  stock: Joi.number().integer().min(0).required(),
});

const getBookValidation = Joi.number().integer().min(1).required();

const borrowBookValidation = Joi.object({
  member_id: Joi.number().integer().min(1).required(),
  book_id: Joi.number().integer().min(1).required(),
});

const returnBookValidation = Joi.object({
  member_id: Joi.number().integer().min(1).required(),
  book_id: Joi.number().integer().min(1).required(),
});

export {
  createBookValidation,
  getBookValidation,
  borrowBookValidation,
  returnBookValidation,
};
