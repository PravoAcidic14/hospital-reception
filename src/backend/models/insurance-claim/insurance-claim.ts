import mongoose from 'mongoose';

// Define the Insurance Claim schema
const insuranceClaimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  policyNumber: { type: String, required: true },
  amount: { type: String, required: true },
  dateIssued: { type: String, required: true },
  status: { type: String, required: true }
});

// Create and export the model
const InsuranceClaim = mongoose.model('InsuranceClaim', insuranceClaimSchema, 'claims');
export default InsuranceClaim;