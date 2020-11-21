// External
import Joi from "joi";

// Local
import { Poster, User } from "../../models/models";
import validators from "../validators";

export default {
  Poster: {
    author: (root, args) => User.findById(root.author),
  },
  Query: {
    // TODO: projection, pagination, sanitization
    posters: async (root, args, context, info) => {
      const posters = await Poster.find({});
      console.log({ posters });
      return posters;
    },
    poster: async (root, args, context, info) => {
      // TODO: projection
      await Joi.validate(args, validators.poster.findPoster);

      return Poster.findById(args.id);
    },
  },
  Mutation: {
    addPoster: async (root, args, context, info) => {
      await Joi.validate(args, validators.poster.addPoster, {
        abortEarly: false,
      });
      const user = await User.findOne({});
      console.log({ user });
      const poster = await Poster.create({
        ...args,
        author: user,
      });
      return poster;
    },
  },
};
