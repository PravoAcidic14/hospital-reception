// Import necessary modules and components
import { Component, OnInit, OnDestroy } from '@angular/core'; // Import Component, OnInit, and OnDestroy for component lifecycle management
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm for form handling
import { CommonModule } from '@angular/common'; // Import CommonModule for common Angular directives and pipes
import { MatCardModule } from '@angular/material/card'; // Import Material Card module for card UI component
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Material Form Field module for form fields
import { MatInputModule } from '@angular/material/input'; // Import Material Input module for input fields
import { MatSelectModule } from '@angular/material/select'; // Import Material Select module for dropdowns
import { MatButtonModule } from '@angular/material/button'; // Import Material Button module for buttons
import { MatDatepickerModule } from '@angular/material/datepicker'; // Import Material Datepicker module for date selection
import { MatNativeDateModule } from '@angular/material/core'; // Import Material Native Date module for date handling
import { Subscription } from 'rxjs'; // Import Subscription for managing subscriptions
import { Claim } from '../insurance-claim.model'; // Import Claim model for type safety
import { ClaimService } from '../insurance-claim.service'; // Import ClaimService for handling claims data
import { ClaimTableComponent } from '../claim-table/claim-table.component'; // Import ClaimTableComponent for displaying claims in a table

// Define the ClaimFormComponent class
@Component({
  selector: 'app-claim-form',
  templateUrl: 'claim-form.component.html',
  styleUrls: ['claim-form.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ClaimTableComponent, 
  ],
})

// Component to handle the insurance claim form
export class ClaimFormComponent implements OnInit, OnDestroy {
  claim: Claim = this.createEmptyClaim(); // Initialize claim object with empty values
  claims: Claim[] = [];// Array to hold claims data
  claimsSub!: Subscription; // Subscription for claims data
  editSub!: Subscription; // Subscription for edit action
  
  constructor(private claimService: ClaimService) {} // Inject ClaimService for data handling

  // ngOnInit lifecycle hook to fetch claims data and set up subscriptions
  ngOnInit() {
    this.claimService.getClaims(); // Fetch claims data from the service
     // Subscribe to claims data updates
    this.claimsSub = this.claimService.getClaimsUpdateListener().subscribe((claims: Claim[]) => { 
      this.claims = claims; // Update local claims array when data changes
    });
    // Subscribe to edit action to populate the form with existing claim data
    this.editSub = this.claimService.getEditClaim().subscribe((claim: Claim | null) => {
      if (claim) { 
        this.claim = { ...claim }; // Populate the form with the claim data
      }
    });
  }

  // ngOnDestroy lifecycle hook to clean up subscriptions
  ngOnDestroy() {
    // Unsubscribe from subscription to ensure no further updates are received
    if (this.claimsSub) {
      this.claimsSub.unsubscribe();
    }
    if (this.editSub) {
      this.editSub.unsubscribe();
    }
  }

  // Method to handle form submission
  submitClaim(form: NgForm) {
    if (form.valid) {
      if (this.claim.id) {
        // If there's an ID, update the existing claim
        console.log('Updating claim:', this.claim);
        this.claimService.updateClaim(this.claim);  // Update method in the service
        alert('Claim successfully updated!');  // Success alert message
      } else {
        // If no ID, add a new claim
        console.log('Submitting new claim:', this.claim);
        this.claimService.addClaim(this.claim);  // Add method in the service
        alert('Claim successfully added!');  // Success alert message
      }

      // Reset the form after submission
      this.resetForm(form);
    } else {
      console.log('Form is invalid!');
    }

    // Fetch updated claims data after submission
    this.claimService.getClaims(); 
  }

  // Method to handle form reset
  resetForm(form: NgForm) {
    form.resetForm();
    this.claim = this.createEmptyClaim(); // Reset form data after submission
  }

  // Returns a blank Claim object to reset the form
  private createEmptyClaim(): Claim {
    return { 
      name: '',
      provider: '',
      policyNumber: '',
      amount: '',
      dateIssued: '',
      status: ''
    };
  }
}