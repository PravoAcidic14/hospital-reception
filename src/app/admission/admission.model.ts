export interface Admission {
  _id: string;
  patientName: string;
  admissionDate: string;
  admissionType: string;
  bedNumber?: number;
}