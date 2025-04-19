// Patient interface to define the structure of patient data
export interface Patient { 
    id?: string; // 
    name: string;
    dob: string; 
    gender: string;
    nationalID: string;
    contact: string;
    email: string;
    address: string;
    emergencyContact: string;
    emergencyRelationship: string;
    emergencyPhone: string;
}