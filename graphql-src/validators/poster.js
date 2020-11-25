import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const title = Joi.string()
  .min(3)
  .max(255)
  .required()
  .label("Title");

const description = Joi.string()
  .min(3)
  .max(1000)
  .required()
  .label("Description");

const stdin = Joi.string()
  .min(0)
  .max(1000)
  .required()
  .label("Input");

const stdout = Joi.string()
  .min(0)
  .max(1000)
  .required()
  .label("Output");

export const addPoster = Joi.object().keys({
  title,
  description,
  stdin,
  stdout
});

export const findPoster = Joi.object().keys({
  id: Joi.objectId()
});
