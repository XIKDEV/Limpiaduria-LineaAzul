import * as Joi from 'joi';

export const joiSchema = Joi.object({
  PORT: Joi.required(),
  HOST_BD: Joi.required(),
  PORT_BD: Joi.number().required(),
  BD: Joi.required(),
  USER_BD: Joi.required(),
  PASSWORD_BD: Joi.required(),
});
