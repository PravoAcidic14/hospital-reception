import { Injectable } from '@angular/core'; // Importing Injectable decorator to create a service
import { Patient } from './patient.model'; // Importing the Patient interface to define the structure of patient data
import { HttpClient } from '@angular/common/http'; // Importing HttpClient to make HTTP requests
import { Subject } from 'rxjs'; //Import Subject to create observables for data sharing

@Injectable({
  providedIn: 'root'
})
export class PatientService { 
  private patients: Patient[] = [];
  private patientUpdated = new Subject<Patient[]>(); // Subject to notify subscribers about patient updates
  private editPatientSubject = new Subject<Patient|null> (); // Subject to notify subscribers about the selected patient for editing
  private apiUrl = 'http://localhost:3000/api/patients'; // API URL for the backend service

  constructor(private http:HttpClient) {} // Injecting HttpClient to make HTTP requests

  // Getting all patients
  getPatients() {  
    this.http.get< any[] >(this.apiUrl) //
      .subscribe((patients) => { // Fetch all patients from the API
        this.patients = patients.map (p => ({
          ...p,
          id: p._id // Map _id to patientId for Angular
        })); // Store the fetched patients in the local array
        this.patientUpdated.next([...this.patients]); // Notify subscribers about the updated patient list
      })
  }

  // Fetching a single patient by ID
  getPatient(id: string) { 
    return this.http.get<Patient>(`${this.apiUrl}/${id}`); // Fetch a single patient by ID
  }

  //Adding a new patient
  addPatient(patient: Patient) {
    this.http.post<any>(this.apiUrl, patient)
      .subscribe((responseData) => {
        const newPatient = { ...patient,id: responseData._id || responseData.id }; // Map _id to patientId
        this.patients.push(newPatient); // Add the new patient to the local array
        this.patientUpdated.next([...this.patients]); // Emit the updated patients list
      });
  }

  //Deleting a patient by its ID
  deletePatient(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.patients = this.patients.filter(patient => patient.id!== id); // Remove the deleted patient from the array
        this.patientUpdated.next([...this.patients]); 
      });
  }

  //Updating an existing patient
  updatePatient(updated: Patient) {
    this.http.put(`${this.apiUrl}/${updated.id}`, updated)
      .subscribe(() => {
        const index = this.patients.findIndex(patient => patient.id === updated.id); // Find the index of the updated patient
        this.patients[index] = {...updated};  // Update the patient in the local array
        this.patientUpdated.next([...this.patients]); 
      });
  }

  //Liatening for updates to the patients data
  getPatientUpdateListener() {
    return this.patientUpdated.asObservable(); // Return an observable for patient updates
  }
  //Selecting a claim for viewing or editing
  setEditPatient(patient: Patient) {
    this.editPatientSubject.next(patient); 
  }

  //Listening for the selected claim (for edit/view)
  getEditPatient() {
    return this.editPatientSubject.asObservable(); // Return the Observable for component subscription
  } 
}