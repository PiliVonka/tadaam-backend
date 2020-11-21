import { ForbiddenError } from "apollo-server-express";

export const isOwner = req => {
  throw new ForbiddenError();
};
