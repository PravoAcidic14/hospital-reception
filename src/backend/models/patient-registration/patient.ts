import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  nationalID: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: false },
  address: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  emergencyRelationship: { type: String, required: true },
  emergencyPhone: { type: String, required: true },
});

const Registration = mongoose.model('Registration', registrationSchema, 'patients'); 
// ✅ Force collection name to 'patients'
export default Registration;