
import mongoose from "mongoose";
import cors from "cors";
import express from "express";


mongoose.connect("mongodb+srv://jeanette:jalilhc%40123@jalil-hc-cluster.nrvback.mongodb.net/admission?retryWrites=true&w=majority")
  .then(() => {
    console.log('MongoDB connected successfully');
    const app = express();
    app.use(cors());

    app.listen(3000, () => {
      console.log('Server is running on port 3000');});
     // Import your Express app here
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });
