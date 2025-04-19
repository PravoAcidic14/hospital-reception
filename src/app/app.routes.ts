import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PatientRegistrationFormComponent } from './patient-registration/patient-registration-form/patient-registration-form.component';
import { AdmissionFormComponent } from './admission/admission-form/admission-form.component';
import { ClaimFormComponent } from './insurance-claim/claim-form/claim-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'patient-registration', component: PatientRegistrationFormComponent },
  { path: 'admission', component: AdmissionFormComponent },
  { path: 'insurance-claim', component: ClaimFormComponent },
];