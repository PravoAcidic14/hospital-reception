import express from 'express';
import Admission from './admission'; // Adjust the path based on the file's location

const admissionRouter = express.Router();
admissionRouter.use(express.json());

admissionRouter.get('/', async (req, res) => {
    try {
        const admissions = await Admission.find(); // Fetch all admissions
        res.status(200).json(admissions);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

admissionRouter.post('/create-admission', (req, res) => {
    const { _id, ...admissionData } = req.body; // Exclude _id from req.body

    const newAdmission = new Admission(admissionData);

    newAdmission.save()
        .then((savedAdmission) => {
            res.status(201).json(savedAdmission);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
});

admissionRouter.put('/:id', (req, res) => {
    const { id } = req.params;

    Admission.findByIdAndUpdate(id, req.body)
        .then((savedAdmission) => {
            if (!savedAdmission) {
                res.status(404).json({ error: 'Admission not found' });
            }
            res.status(200).json(savedAdmission);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
});

admissionRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params)

    Admission.findByIdAndDelete(id)
        .then((deletedAdmission) => {
            if (!deletedAdmission) {
                res.status(404).json({ error: 'Admission not found' });
            }
            res.status(200).json({ message: 'Admission deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
        });
});

export default admissionRouter;