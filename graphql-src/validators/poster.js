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

export const addPoster = Joi.object().keys({
  title,
  description
});

export const findPoster = Joi.object().keys({
  id: Joi.objectId()
});
