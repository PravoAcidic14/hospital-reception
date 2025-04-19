import { Component, OnInit, OnDestroy} from '@angular/core'; // Importing necessary Angular core modules for component lifecycle hooks
import { FormsModule, NgForm } from '@angular/forms'; // Importing FormsModule and NgForm for template-driven forms
import { CommonModule } from '@angular/common';// Importing CommonModule for common directives and pipes
import { MatFormFieldModule } from '@angular/material/form-field';// Importing Angular Material form field module
import {MatCardModule} from '@angular/material/card'; // Importing Angular Material card module
import { MatInputModule } from '@angular/material/input';// Importing Angular Material input module
import { MatSelectModule } from '@angular/material/select'; // Importing Angular Material select module
import { MatButtonModule } from '@angular/material/button'; // Importing Angular Material button module
import { MatDatepickerModule } from '@angular/material/datepicker';// Importing Angular Material date picker module
import { MatNativeDateModule } from '@angular/material/core'; // Importing Angular Material modules for form fields, cards, inputs, select dropdowns, buttons, and date pickers
import { PatientTableComponent } from '../patient-table/patient-table.component';
import { Patient } from '../patient.model'; // Import the Patient interface
import { PatientService } from '../patient.service'; // Import the PatientService
import { Subscription } from 'rxjs'; // Import Subscription for managing subscriptions


/**
    * @title Patient Registration Form
*/
@Component({
  selector: 'app-patient-registration-form', // Selector for the component
  templateUrl: 'patient-registration-form.component.html', // Template URL for the component
  styleUrls: ['patient-registration-form.component.css'], // Stylesheet URL for the component
  standalone: true, // Indicates that this component is standalone and can be used without being declared in an NgModule
  imports: [ // Importing necessary modules for the component
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PatientTableComponent,
  ],
})
export class PatientRegistrationFormComponent implements OnInit, OnDestroy { 
  patient: Patient = this.createEmptyPatient(); // Object to hold the patient data from the form
  patients: Patient[] = [];  //Displayed in the table
  patientSub!: Subscription; // Subscription to listen to updates
  editSub!: Subscription; // Subscription for editing
  
  constructor(private patientService: PatientService) {} 
  // Injecting the PatientService to access its methods and properties

  ngOnInit() {
    // Fetch initial patients
    this.patientService.getPatients();
    
    // Subscribe to patient list updates
    this.patientSub = this.patientService.getPatientUpdateListener()
      .subscribe((patients: Patient[]) => {
        this.patients = patients;
      });

    // Subscribe to edit patient updates
    this.editSub = this.patientService.getEditPatient()
      .subscribe((patient: Patient | null) => {
        if (patient) {
          this.patient = { ...patient };
        }
      });
  }


  // This method is called when the component is destroyed
  ngOnDestroy() {
    if (this.patientSub) {
      this.patientSub.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
    if (this.editSub) {
      this.editSub.unsubscribe(); // Unsubscribe to avoid memory leaks
    }
  }
      
  // This method is called when the form is submitted
  // It checks if the form is valid and if so, it creates a new patient object
  // and adds it to the patients array
  registerPatient(form: NgForm) {
    if (form.valid) {
      if (this.patient.id) {
        // If there's an ID, it will update the existing patient
        console.log('Updating patient:', this.patient);
        this.patientService.updatePatient(this.patient);  // Update method in the service
      } else {
        // If there's no ID,a new patient is being registered
        console.log('Registering new patient:', this.patient); // Log the new patient object
        this.patientService.addPatient(this.patient); // Add method in the service
        alert('Patient successfully registered!');  // Success alert message
      }

      this.resetForm(form); // Reset the form after submission
    } else {
      // If the form is invalid, log a message to the console
      console.log('Form is invalid!');
    }
    
    this.patientService.getPatients(); // Fetch patients again after submission to update the table
  }

  resetForm(form: NgForm) {
    form.resetForm(); // Reset the form fields
    this.patient = this.createEmptyPatient(); // Reset the patient object to default values
  }

  // This method creates an empty patient object with default values
  // This is used to reset the form after successful registration
  private createEmptyPatient(): Patient { 
    return {
      id: undefined,
      name: '',
      dob: '',
      gender: '',
      nationalID: '',
      contact: '',
      email: '',
      address: '',
      emergencyContact: '',
      emergencyRelationship: '',
      emergencyPhone: ''
    };
  }
}