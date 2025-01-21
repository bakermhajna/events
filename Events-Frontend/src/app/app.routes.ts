import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { AuthGuard } from './Services/AuthGuard.service';

export const routes: Routes = 
[
    { 
        path: '', 
        component: LoginFormComponent 
    },
    { 
        path: 'home', 
        component: HomePageComponent,
        canActivate: [AuthGuard]
    },
    // Add AuthGuard to any other routes that need protection
    { 
        path: 'group', 
        component: GroupsPageComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'addevent', 
        component: AddEventComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'addgroup', 
        component: AddGroupComponent,
        canActivate: [AuthGuard]
    },
    // Add a catch-all route for undefined routes
    { 
        path: '**', 
        redirectTo: '' 
    }
];
