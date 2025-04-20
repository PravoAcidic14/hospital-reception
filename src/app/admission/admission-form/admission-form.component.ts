import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Admission } from '../admission.model';
import { AdmissionService } from '../admission.service';
import { AdmissionTableComponent } from '../admission-table/admission-table.component';

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
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css'],
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
    AdmissionTableComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AdmissionFormComponent implements OnInit {
  
  beds: number[] = Array.from({ length: 50 }, (_, i) => i + 1);

  admission: Admission = {
    patientName: '',
    admissionDate: '',
    admissionType: '',
    bedNumber: undefined
  };

  admissions: Admission[] = [];     // Full list of admissions
  filteredAdmissions: Admission[] = []; // Filtered admissions for search

  constructor(private admissionService: AdmissionService) {}

  ngOnInit(): void {
    this.admissionService.getAdmissions().subscribe((admissions: Admission[]) => {
      this.admissions = admissions;
      this.filteredAdmissions = admissions;
    });
  
    this.admissionService.getEditAdmission().subscribe((admission: Admission | null) => {
      if (admission) {
        this.admission = { ...admission };
      }
    });
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredAdmissions = this.admissions.filter(admission =>
      admission.patientName.toLowerCase().includes(filterValue)
    );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if ((this.admission as any)._id) {
        // Editing existing admission
        this.admissionService.updateAdmission(this.admission).subscribe(() => {
          this.reloadAdmissions();
          alert('Admission Updated Successfully!');
          this.resetForm();
        });
      } else {
        // Creating new admission
        this.admissionService.addAdmission(this.admission).subscribe(() => {
          this.reloadAdmissions();
          alert('Patient Admitted Successfully!');
          this.resetForm();
        });
      }
    } else {
      console.log('Form is invalid!');
    }
  }

  editAdmission(admission: Admission) {
    this.admission = { ...admission };
  }

  deleteAdmission(id: string) {
    if (confirm('Are you sure you want to delete this admission?')) {
      this.admissionService.deleteAdmission(id).subscribe(() => {
        this.reloadAdmissions();
        alert('Admission Deleted Successfully!');
      });
    }
  }

  resetForm() {
    this.admission = {
      patientName: '',
      admissionDate: '',
      admissionType: '',
      bedNumber: undefined
    };
  }

  reloadAdmissions() {
    this.admissionService.getAdmissions().subscribe((admissions: Admission[]) => {
      this.admissions = admissions;
      this.filteredAdmissions = admissions;
    });
  }
}
