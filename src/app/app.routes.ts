import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DocumentComponent } from './document/document.component';
import { AdminComponent } from './admin/admin.component';
import { IngestionComponent } from './ingestion/ingestion.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'document', component: DocumentComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'ingestion', component: IngestionComponent },
];