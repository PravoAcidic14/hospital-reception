import express from 'express';
import InsuranceClaim from './insurance-claim'; // Adjust if needed

const insuranceClaimRouter = express.Router();
insuranceClaimRouter.use(express.json());

// POST: Add new claim
insuranceClaimRouter.post('/', async (req, res) => {
  try {
    const newClaim = new InsuranceClaim(req.body);
    await newClaim.save();
    res.status(201).json(newClaim);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    return;
  }
});

// GET: Fetch all claims
insuranceClaimRouter.get('/', async (req, res) => {
  try {
    const claims = await InsuranceClaim.find();
    res.status(200).json(claims);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    return;
  }
});

// GET: Fetch single claim by ID
insuranceClaimRouter.get('/:id', async (req, res) => {
  try {
    const claim = await InsuranceClaim.findById(req.params.id);
    if (!claim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }
    res.status(200).json(claim);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    return;
  }
});

// PUT: Update claim by ID
insuranceClaimRouter.put('/:id', async (req, res) => {
  try {
    const updatedClaim = await InsuranceClaim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClaim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }
    res.status(200).json(updatedClaim);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    return;
  }
});

// DELETE: Delete claim by ID
insuranceClaimRouter.delete('/:id', async (req, res) => {
  try {
    const deletedClaim = await InsuranceClaim.findByIdAndDelete(req.params.id);
    if (!deletedClaim) {
      res.status(404).json({ message: 'Claim not found' });
      return;
    }
    res.status(200).json({ message: 'Claim deleted successfully' });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
    return;
  }
});

export default insuranceClaimRouter;