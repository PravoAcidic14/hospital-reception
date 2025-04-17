import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  private baseUrl = 'http://localhost:3000/api/admission'; // your backend running on 5000

  constructor(private http: HttpClient) { }

  createAdmission(admissionData: any): Observable<any> {
    return this.http.post(this.baseUrl, admissionData);
  }
}
