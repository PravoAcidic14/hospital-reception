import express from 'express';
import Registration from './patient'; // Import model

const registrationRouter = express.Router();
registrationRouter.use(express.json());

// POST: Add a patient
registrationRouter.post('/create-patient', async (req, res) => {
  try {
    const patient = new Registration(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
});

// GET: All patients
registrationRouter.get('/', async (req, res) => {
  try {
    const patients = await Registration.find();
    res.status(200).json(patients);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
    return;
  }
});

// GET: Single patient
registrationRouter.get('/:id', async (req, res) => {
  try {
    const patient = await Registration.findById(req.params.id);
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
    return;
  }
});

// PUT: Update patient
registrationRouter.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(updatedPatient);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
    return;
  }
});

// DELETE: Delete patient
registrationRouter.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Registration.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error occurred' });
    }
    return;
  }
});

export default registrationRouter;