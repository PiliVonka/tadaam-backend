// External
import Joi from "joi";

// Local
import { Submission, User, Poster } from "../../models";
import validators from "../validators";
import { runCode, getStatus } from "../../utils/JudgeAPI";

export default {
  Submission: {
    author: (root, args) => User.findById(root.author),
  },
  Query: {
    submissions: async (root, args, context, info) => {
      const submissions = await Submission.find({});
      return submissions;
    },
    submission: async (root, args, context, info) => {
      await Joi.validate(args, validators.submission.findSubmission);

      return Submission.findById(args.id);
    },
    checkSubmission: async (root, args, context, info) => {
      console.log("HAHA");
      await Joi.validate(args, validators.submission.checkSubmission);

      const submission = await Submission.findById(args.id);
      console.log({ submission });
      if (submission.finished) {
        return submission;
      }

      const { status_id: statusId } = await getStatus(submission.codeKey);
      if (statusId > 2) {
        submission.finished = true;
      }
      submission.status = statusId;

      await submission.save();
      return submission;
    }
  },
  Mutation: {
    addSubmission: async (root, args, context, info) => {
      await Joi.validate(args, validators.submission.addSubmission, {
        abortEarly: false,
      });

      const user = await User.findOne();
      const poster = await Poster.findById(args.posterId);
      const { token } = await runCode(args.code, poster.stdin, poster.stdout);
      const submission = await Submission.create({
        ...args,
        poster,
        author: user,
        codeKey: token
      });
      return submission;
    },
  },
};
