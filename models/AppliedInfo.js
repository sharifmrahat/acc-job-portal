const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const appliedJobSchema = mongoose.Schema({
  candidate: {
      type: ObjectId,
      ref: "Candidate"
  },
  resumeId: {
    type: String,
  },
  job: {
      type: ObjectId,
      ref: "Job"
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});


const AppliedInfo = mongoose.model("AppliedInfo", appliedJobSchema);

module.exports = AppliedInfo;