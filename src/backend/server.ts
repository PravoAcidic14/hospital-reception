import mongoose from "mongoose";
import cors from "cors";
import express from "express";

import registrationRouter from './models/patient-registration/patient.routes';
import admissionRouter from './models/admission/admission.routes';
import insuranceClaimRouter from './models/insurance-claim/insurance-claim.routes';

mongoose.connect("mongodb+srv://jeanette:jalilhc%40123@jalil-hc-cluster.nrvback.mongodb.net/hospitalDB?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected successfully');
    const app = express();
    app.use(cors());
    app.use(express.json());

    // ✅ Mount Routers
    app.use('/api/patients', registrationRouter);
    app.use('/api/admission', admissionRouter);
    app.use('/api/claims', insuranceClaimRouter);

     // ✅ Start server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });