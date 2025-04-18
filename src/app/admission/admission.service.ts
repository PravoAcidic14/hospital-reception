import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admission } from './admission.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private baseUrl = 'http://localhost:3000/api/admission';
  admissions$ = signal<Admission[]>([]); // Signal to hold admissions

  constructor(private http: HttpClient) { }

  createAdmission(admissionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-admission`, admissionData); // Updated to include /create-admission
  }

  getAdmissions() {
    this.refreshAdmissions(); // Fetch admissions when this method is called
    return this.admissions$; // Return the signal to be used in components
  }

  updateAdmission(id: string, admission: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, admission); // Updated to include /:id
  }

  deleteAdmission(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`); // Updated to include /:id
  }

  private refreshAdmissions() {
    this.http.get<Admission[]>(this.baseUrl).subscribe({
      next: admissions => {
        console.log('Fetched admissions:', admissions);
        this.admissions$.set(admissions); // Update the signal with fetched admissions
      },
      error: err => {
        console.error('Error fetching admissions:', err);
      }
    });
  }
}