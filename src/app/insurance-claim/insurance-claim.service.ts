// Import necessary modules and services
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Claim } from './insurance-claim.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Service to handle insurance claims
export class ClaimService {
  private claims: Claim[] = [];
  private claimsUpdated = new Subject<Claim[]>(); // Subject to notify subscribers
  private apiUrl = 'http://localhost:3000/api/claims'; // API endpoint for claims

  // Observable to notify components when a claim is set for editing
  private editClaimSubject = new Subject<Claim | null>();

  // Constructor to inject HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}

  // Get all claims 
  getClaims() {
    // Make a GET request to fetch claims from the API
    this.http.get<Claim[]>(this.apiUrl).subscribe((claims) => {
      // Map _id to id for use in Angular
      this.claims = claims.map(c => ({
        ...c,
        id: c._id // Map _id from backend to id for Angular usage
      }));
      // Notify subscribers about the updated claims
      this.claimsUpdated.next([...this.claims]);
    });
  }

  // Get single claim
  getClaim(id: string) {
    // Make a GET request to fetch a single claim by ID from the API
    return this.http.get<Claim>(`${this.apiUrl}/${id}`);
  }

  // Observable to notify components when data updates
  getClaimsUpdateListener() {
    // Return an observable to allow components to subscribe to claims updates
    return this.claimsUpdated.asObservable();
  }

  //  Add a new claim 
  addClaim(claim: Claim) {
    // Make a POST request to add a new claim to the API
    this.http.post<{_id: string}>(this.apiUrl, claim).subscribe((responseData) => { 
      claim.id = responseData._id;  // Assign the generated ID from the response to the claim object
      this.claims.push(claim);  // Add the new claim to the list
      this.claimsUpdated.next([...this.claims]);  // Notify subscribers about the updated claims
    });
  }

  // Delete a claim by ID
  deleteClaim(id: string) {
    // Make a DELETE request to remove a claim from the API
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      // Remove the claim from the local list
      this.claims = this.claims.filter(claim => claim.id !== id); 
      this.claimsUpdated.next([...this.claims]); // Notify subscribers about the updated claims
    });
  }

  // Update an existing claim
  updateClaim(updatedClaim: Claim) {
    // Make a PUT request to update the claim in the API
    this.http.put(`${this.apiUrl}/${updatedClaim.id}`, updatedClaim).subscribe(() => {
      // Find the index of the claim to be updated in the local list
      const index = this.claims.findIndex(claim => claim.id === updatedClaim.id);
      // If the claim is found, update it in the local list
      if (index !== -1) {
        this.claims[index] = { ...updatedClaim };
        this.claimsUpdated.next([...this.claims]); // Notify subscribers about the updated claims
      }
    });
  }

  // Set the claim to be edited
  setEditClaim(claim: Claim) {
    this.editClaimSubject.next(claim);// Notify subscribers about the claim to be edited
  }
  
  // Get the claim to be edited
  getEditClaim() {
    return this.editClaimSubject.asObservable(); 
  }
}