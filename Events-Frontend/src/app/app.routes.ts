import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomePageComponent
    },
    {
        path:"login",
        component:LoginFormComponent
    }
];
