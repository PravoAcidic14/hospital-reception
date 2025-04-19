import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
    patientName: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    admissionType: {
      type: String,
      required: true,
    },
    bedNumber: {
      type: Number,
    }
  }
);

const Admission = mongoose.model("Admission", admissionSchema);
export default Admission;