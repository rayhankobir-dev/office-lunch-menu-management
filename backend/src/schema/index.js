import Joi from "joi";

export const userSchema = {
  signup: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid("admin", "employee").required(),
  }),
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const menuSchema = {
  add: Joi.object({
    name: Joi.string().min(2).required(),
    unit: Joi.string().max(60).required(),
  }),
  edit: Joi.object({
    name: Joi.string().max(60).required(),
    unit: Joi.string().max(60).required(),
  }),
  id: Joi.object({
    id: Joi.number().required(),
  }),
};

export const optionSchema = {
  edit: Joi.object({
    date: Joi.date().required(),
    maxLimit: Joi.number().min(1).required(),
  }),
  date: Joi.object({
    date: Joi.string().required(),
  }),
};
