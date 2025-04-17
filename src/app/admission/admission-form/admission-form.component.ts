import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { AdmissionTableComponent } from '../admission-table/admission-table.component';
import { MatSelectModule } from '@angular/material/select';
import { Admission } from '../admission.model';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { AdmissionService } from '../admission.service';

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
    AdmissionTableComponent,
    MatTableModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css']
})
export class AdmissionFormComponent {

  constructor(private admissionService: AdmissionService) { } // ✅ Inject the service
  beds: number[] = Array.from({ length: 50 }, (_, i) => i + 1); // 1–50

  admission: Admission = {
    patientName: '',
    admissionDate: '',
    admissionType: '',
    bedNumber: undefined
  };

  admissions = new MatTableDataSource<Admission>([]);  // ✅ Store multiple admissions

  submitted = false;

  // 🌟 New: Search functionality
  searchTerm: string = ''; // ✅ New variable for search bar

  // 🌟 New: Getter to filter admissions list
  get filteredAdmissions() {
    if (!this.searchTerm) {
      return this.admissions;
    }
    const filteredData = this.admissions.data.filter(admission =>
      admission.patientName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return new MatTableDataSource<Admission>(filteredData);
  }  

  onSubmit() {
    const admissionData = {
      patientName: this.admission.patientName,
      admissionDate: this.admission.admissionDate,
      admissionType: this.admission.admissionType,
      bedNumber: this.admission.bedNumber
    };
  
    this.admissionService.createAdmission(admissionData).subscribe(
      (response) => {
        console.log('Admission created successfully:', response);
        // After success: push to table if needed
        this.searchTerm = '';
    alert('Patient Admitted Successfully!');
      },
      (error) => {
        console.error('Error creating admission:', error);
        alert('Error creating admission');
      }
    );
    // this.admissions.data.push({ ...this.admission }); // Push into admissions.data
    // this.admissions._updateChangeSubscription(); // 🔥 Force table to refresh
    // this.submitted = true;
    
    // this.admission = {
    //   patientName: '',
    //   admissionDate: '',
    //   admissionType: '',
    //   bedNumber: undefined
    // };
  
    
  }    
}