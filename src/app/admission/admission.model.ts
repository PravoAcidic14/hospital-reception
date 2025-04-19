export interface Admission {
  _id?: string; // <== IMPORTANT: Use _id (MongoDB style)
  patientName: string;
  admissionDate: string;
  admissionType: string;
  bedNumber?: number;
}