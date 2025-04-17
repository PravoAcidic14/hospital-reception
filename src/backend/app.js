import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import Admission from './models/admission.ts'

const app = express()

app.use(bodyParser.json());

app.use(cors())

app.post('/api/admission', (req, res) => {
    try {
        const admission = new Admission({
            patientName: req.body.patientName,
            admissionDate: req.body.admissionDate,
            admissionType: req.body.admissionType,
            bedNumber: req.body.bedNumber,
        })
    
        
        console.log(admission)
    
        admission.save()
    } catch (error) {
        console.log('Error creating admission:', error);
        res.status(500).json({
            message: 'Error creating admission',
            error: error.message,
        });
    }
});