import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AddEventComponent } from './add-event/add-event.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';
import { AddGroupComponent } from './add-group/add-group.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomePageComponent
    },
    {
        path:"",
        component:LoginFormComponent
    },
    {
        path:"addevent",
        component:AddEventComponent
    },
    {
        path:"group",
        component:GroupsPageComponent
    },
    {
        path:"addgroup",
        component:AddGroupComponent
    }
];
