import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admission-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './admission-table.component.html',
  styleUrls: ['./admission-table.component.css']
})
export class AdmissionTableComponent {
  @Input() admissions: any[] = [];
  displayedColumns: string[] = ['patientName', 'admissionType', 'bedNumber', 'admissionDate'];
}