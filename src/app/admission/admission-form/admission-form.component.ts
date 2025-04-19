import { Component, effect, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { AdmissionTableComponent } from '../admission-table/admission-table.component';
import { MatSelectModule } from '@angular/material/select';
import { Admission } from '../admission.model';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'
import { AdmissionService } from '../admission.service';
import { Types } from 'mongoose';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-admission-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css']
})
export class AdmissionFormComponent implements OnInit {
  beds: number[] = Array.from({ length: 50 }, (_, i) => i + 1); // 1–50

  admission: Admission = {
    _id: '',
    patientName: '',
    admissionDate: '',
    admissionType: '',
    bedNumber: undefined
  };

  searchTerm: string = ''; // Search term for filtering admissions

  admissions = new MatTableDataSource<Admission>([]); // Initialize with an empty array);

  constructor(private admissionService: AdmissionService) { 
    effect(() => {
      this.admissions.data = this.admissionService.admissions$(); // Update table data when the signal changes
    });
  }

  ngOnInit() {// Fetch admissions on component load
    this.admissionService.getAdmissions();
  }

  applyFilter() {
    this.admissions.filter = this.searchTerm.trim().toLowerCase(); // Filter admissions based on search term
  } 

  onEdit(admission: Admission) {
    // Need to build a pop up modal to allow users to edit the admission details
    // once done with the modal, the user can click on a button to save the changes
    // and then can call the updateAdmission method to update the admission details
  }

  onDelete(admissionId: string) {
    if (confirm('Are you sure you want to delete this admission?')) {
      console.log('Deleting admission:', admissionId);
      this.admissionService.deleteAdmission(admissionId).subscribe(
        (response) => {
          console.log('Admission deleted successfully:', response);
          this.admissionService.getAdmissions(); // Refresh the admissions list
          alert('Admission Deleted Successfully!');
        },
        (error) => {
          console.error('Error deleting admission:', error);
          alert('Error deleting admission');
        }
      );
    }
  }

  onSubmit() {
    this.admissionService.createAdmission(this.admission).subscribe(
      (response) => {
        console.log('Admission created successfully:', response);
        this.admissionService.getAdmissions();
        alert('Patient Admitted Successfully!');
        this.resetForm(); // Reset the form after successful submission
      },
      (error) => {
        console.error('Error creating admission:', error);
        alert('Error creating admission');
      }
    );
  }    

  resetForm() {
    this.admission = {
      _id: '',
      patientName: '',
      admissionDate: '',
      admissionType: '',
      bedNumber: undefined
    };

    this.searchTerm = ''; // Reset search term
    this.admissions.filter = ''; // Clear the filter
  }
}