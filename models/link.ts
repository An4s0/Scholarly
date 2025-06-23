import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Link = mongoose.models.links || mongoose.model("links", linkSchema);
export default Link;