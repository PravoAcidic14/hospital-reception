import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Admission } from '../admission.model';
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-admission-table',
  standalone: true,
  templateUrl: './admission-table.component.html',
  styleUrls: ['./admission-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AdmissionTableComponent implements OnInit, OnChanges {
  @Input() admissions: Admission[] = [];

  displayedColumns: string[] = ['patientName', 'admissionType', 'bedNumber', 'admissionDate', 'actions'];
  dataSource!: MatTableDataSource<Admission>;

  constructor(private admissionService: AdmissionService) {}

  ngOnInit() {
    console.log('AdmissionTableComponent initialized. Initial admissions:', this.admissions);
    this.dataSource = new MatTableDataSource(this.admissions);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['admissions']) {
      console.log('Admissions updated in AdmissionTableComponent:', this.admissions);
      this.dataSource.data = this.admissions;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAdmission(admission: Admission) {
    console.log('Editing admission:', admission);
    this.admissionService.setEditAdmission(admission); // ✅ This will trigger the Subject
  }
  
  deleteAdmission(id: string) {
    if (confirm('Are you sure you want to delete this admission?')) {
      console.log('Deleting admission ID:', id);
      this.admissionService.deleteAdmission(id).subscribe(() => {
        alert('Admission deleted successfully!');
        this.admissionService.getAdmissions(); // Refresh the list
      }, (error) => {
        console.error('Error deleting admission:', error);
        alert('Failed to delete admission.');
      });
    }
  }
}
