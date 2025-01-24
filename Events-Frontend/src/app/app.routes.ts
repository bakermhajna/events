import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AddEventComponent } from './pages/add-event/add-event.component';
import { GroupsPageComponent } from './pages/groups-page/groups-page.component';
import { AddGroupComponent } from './pages/add-group/add-group.component';
import { AuthGuard } from './Services/AuthGuard.service';
import { GroupPageComponent } from './pages/group-page/group-page.component';
import { AddUserToGroupComponent } from './components/add-user-to-group/add-user-to-group.component';

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
        path: 'groups', 
        component: GroupsPageComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'addevent', 
        component: AddEventComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'addevent/:id', 
        component: AddEventComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'addgroup', 
        component: AddGroupComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'group/:id', 
        component: GroupPageComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'adduser/:id', 
        component: AddUserToGroupComponent,
        canActivate: [AuthGuard],
    },
    // Add a catch-all route for undefined routes
    { 
        path: '**', 
        redirectTo: '' 
    }
];
