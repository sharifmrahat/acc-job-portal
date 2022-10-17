const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    manager: {
        name: {
          type: String,
          trim: true,
        },
        id: {
          type: ObjectId,
          ref:"Manager"
        }
      },
  title: {
    type: String,
    trim: true,
    required: [true, "Please provide a job title"],
    maxLength: 100,
    unique: true,
    lowercase: true,
  },
  description: String,
  remuneration: {
    type: Number,
    required: true,
    min: [0, "Remuneration can't be negative"]
  },
  totalApplied: {
    type: Number,
    required: true,
    min: [0, "Number of applied must be integer"]
  },
 
  candidates: [{
    name: String,
    contanctNumber: String,
    id: {
      type: ObjectId,
      ref: "Candidate"
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;