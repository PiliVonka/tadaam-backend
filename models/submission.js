import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const SubmissionSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  codeKey: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  author: {
    type: ObjectId,
    required: true
  },
  finished: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 0
  }
});

const Submission = model("Submission", SubmissionSchema);
export default Submission;
