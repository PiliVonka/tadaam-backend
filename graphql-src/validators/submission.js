import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const code = Joi.string()
  .min(1)
  .max(10000)
  .required()
  .label("Code");

/*
const codeKey = Joi.string()
  .min(3)
  .max(1000)
  .required()
  .label("CodeKey");
*/

export const addSubmission = Joi.object().keys({
  code,
  posterId: Joi.objectId()
});

export const checkSubmission = Joi.object().keys({
  id: Joi.objectId(),
});

export const findPoster = Joi.object().keys({
  id: Joi.objectId()
});
