import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AdmissionFormComponent } from './admission/admission-form/admission-form.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'admission', component: AdmissionFormComponent }
];