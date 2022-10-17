const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide candidate name"],
    maxLength: 100,
    unique: true,
    lowercase: true,
  },
  resumeUrl: [{
    type: String,
    validate: [validator.isURL, "please provide a valid url"]
  }],
  appliedJobs: [{
    title: String,
    description: String,
    id: {
      type: ObjectId,
      ref: "Job"
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }

}, {
  timestamps: true
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;