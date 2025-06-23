import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  citations: {
    type: Number,
    required: true,
  },
  hIndex: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  publications: [
    {
      title: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      citations: {
        type: Number,
        required: true,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.models.profiles || mongoose.model("profiles", profileSchema);
export default Profile;