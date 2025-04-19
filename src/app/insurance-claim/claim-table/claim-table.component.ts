// Import necessary modules and components
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Claim } from '../insurance-claim.model';
import { ClaimService } from '../insurance-claim.service';

// Define the ClaimTableComponent class
@Component({
  selector: 'app-claim-table',
  standalone: true,
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ]
})

// Component to handle the insurance claim table
export class ClaimTableComponent implements OnInit, OnChanges {
  // Input property to receive claims data from parent component
  @Input() claims: Claim[] = [];
  // Define the columns to be displayed in the table
  displayedColumns: string[] = ['name', 'policyNumber', 'provider', 'amount', 'status', 'dateIssued', 'actions'];
  dataSource!: MatTableDataSource<Claim>; // Data source for the table

  constructor(private claimService: ClaimService) {} // Constructor to inject the ClaimService

  // ngOnInit lifecycle hook to initialize the component
  ngOnInit() {
    console.log('ClaimTableComponent initialized. Initial claims:', this.claims); 
    // Initialize the data source with the claims data
    this.dataSource = new MatTableDataSource(this.claims);
  }
 
  // ngOnChanges lifecycle hook to handle changes in the claims input property
  ngOnChanges(changes: SimpleChanges) {
    if (changes['claims']) {
      console.log('Claims updated in ClaimTableComponent:', this.claims); 
      this.dataSource.data = this.claims;  // Update the table data when the claims input changes
    }
  }

  // Apply a filter to the table based on user input
  applyFilter(event: Event) {
    // Get the filter value from the input field
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Convert to lowercase for case-insensitive filtering
  }

  // Delete a claim
  deleteClaim(claim: Claim) {
    console.log('Deleting claim with ID:', claim.id); // Log claim being deleted
    if (confirm(`Are you sure you want to delete the claim for ${claim.name}?`)) { // Confirm deletion with the user
      this.claimService.deleteClaim(claim.id!); 
      this.dataSource.data = this.dataSource.data.filter(c => c.id !== claim.id);// Remove the deleted claim from the data source
      alert('Claim successfully deleted!');  // Success alert message
    }
  }

  // Edit a claim
  editClaim(claim: Claim) {
    console.log('Editing claim:', claim); // Log claim being edited
    this.claimService.setEditClaim(claim); // Set the claim to be edited in the service
  }
}