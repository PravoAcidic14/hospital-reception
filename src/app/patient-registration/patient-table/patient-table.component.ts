import { Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../patient.model';
import { PatientService } from '../patient.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule
  ]
})

export class PatientTableComponent implements OnChanges {
  @Input() patients: Patient[] = [];
 
  displayedColumns: string[] = [
    'name', 
    'dob', 
    'gender', 
    'nationalID', 
    'contact', 
    'email', 
    'address', 
    'emergencyContact', 
    'emergencyRelationship', 
    'emergencyPhone',
    'actions'
  ];

  // Columns to be displayed in the table
  dataSource = new MatTableDataSource<Patient>(); // Data source for the table

  // Constructor to initialize the component
  constructor(private patientService: PatientService,) {} // Injecting the patient service to handle actions
  
  // Lifecycle hook that is called after the component is initialized
  ngOnInit() {
    console.log('PatientTableComponent initialized. Initial patients:', this.patients); // Debugging: Log initial patients
    this.dataSource.data = this.patients;
  }
  
  // Lifecycle hook that is called when the component's inputs change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['patients']) {
    // Check if the patients input has changed
    console.log('Patients updated in PatientTableComponent:', this.patients); // Debugging: Log updated claims
    this.dataSource.data = this.patients;  // Update the table data when the claims input changes
    }
  }
  
  // Apply sorting to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter the data source based on user input
  }

  // Delete a patient from the table
  deletePatient(patient: Patient) {
    console.log('Deleting patient with ID:', patient.id); // Debugging: Log patient being deleted
    if (confirm(`Are you sure you want to delete the patient for ${patient.name}?`)) {
      this.patientService.deletePatient(patient.id!);
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== patient.id);
      alert('Patient successfully deleted!');  // Success alert message
    }
  }

  // Edit a patient's details
  editPatient(patient: Patient) {
    console.log('Editing patient:', patient); // Debugging: Log patient being edited
    this.patientService.setEditPatient(patient); // Set the patient to be edited in the service
  }
}