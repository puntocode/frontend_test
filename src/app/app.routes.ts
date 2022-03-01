import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./pages/register/register.component";


const APP_ROUTES: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: '**', pathMatch: 'full', redirectTo: 'register'}
];

export const app_routing = RouterModule.forRoot(APP_ROUTES);
