import mongoose from "mongoose";

//TODO: Add actual model
var eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //adds createdAt and updatedAt automatically. See from DB
);

const Event = mongoose.model("event", eventSchema);

export default Event;
