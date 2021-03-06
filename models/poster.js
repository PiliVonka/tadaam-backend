import mongoose from "mongoose";

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const PosterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: ObjectId,
    required: true
  },
  stdin: {
    type: String,
    default: ""
  },
  stdout: {
    type: String,
    default: ""
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Poster = model("Poster", PosterSchema);
export default Poster;
