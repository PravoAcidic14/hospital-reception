import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Admission } from './admission.model';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {
  private admissions: Admission[] = [];
  private admissionUpdated = new Subject<Admission[]>();
  private apiUrl = 'http://localhost:3000/api/admission';

  private editAdmissionSubject = new Subject<Admission | null>();

  constructor(private http: HttpClient) {}

  // ✅ Get all admissions
  getAdmissions(): Observable<Admission[]> {
    return this.http.get<Admission[]>(this.apiUrl);
  }

  // ✅ Create new admission
  addAdmission(admission: Admission): Observable<Admission> {
    return this.http.post<Admission>(`${this.apiUrl}/create-admission`, admission);
  }

  // ✅ Update existing admission
  updateAdmission(admission: Admission): Observable<Admission> {
    return this.http.put<Admission>(`${this.apiUrl}/${admission._id}`, admission);
  }

  // ✅ Delete admission by ID
  deleteAdmission(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Send selected admission for editing
  setEditAdmission(admission: Admission) {
    this.editAdmissionSubject.next(admission);
  }

  // ✅ Listen for selected admission to edit
  getEditAdmission(): Observable<Admission | null> {
    return this.editAdmissionSubject.asObservable();
  }
}