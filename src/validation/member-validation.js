import Joi from "joi";

export const createMemberValidation = Joi.object({
  name: Joi.string().max(150).required(),
  quota: Joi.number().integer().min(1).required().messages({
    "number.min": "quota minimal 1",
  }),
});

export const getMemberValidation = Joi.object({
  memberId: Joi.number().integer().min(1).required(),
});
