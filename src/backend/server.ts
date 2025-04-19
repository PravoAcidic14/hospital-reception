import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import admissionRouter from './models/admission/admission.routes'; // Import the admission router


mongoose.connect("mongodb+srv://jeanette:jalilhc%40123@jalil-hc-cluster.nrvback.mongodb.net/admission?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected successfully');
    const app = express();
    app.use(cors());

    app.use('/api/admission', admissionRouter); // Use the admission router for the /api/admission route

    app.listen(3000, () => {
      console.log('Server is running on port 3000');});
     // Import your Express app here
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
