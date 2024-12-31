import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddEventComponent } from './add-event/add-event.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomePageComponent
    },
    {
        path:"login",
        component:LoginFormComponent
    },
    {
        path:"addevent",
        component:AddEventComponent
    }
];
