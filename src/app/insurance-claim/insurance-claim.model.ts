// Model for insurance claim component
export interface Claim {
    id?: string; // ID for the claim, used for editing or deleting
    _id?: string; // MongoDB ID for the claim, used for API requests
    name: string; 
    policyNumber: string;
    provider: string;
    amount: string;
    status: string;
    dateIssued: string;
  }  