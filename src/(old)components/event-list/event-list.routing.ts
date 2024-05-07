import { Route } from '@angular/router';
import { EventListComponent } from './event-list.component';
import { GetAllUserTestResolver } from './event-list.resolve';

export const EventListRoutes: Route[] = [
    {
        path     : '',
        component:EventListComponent,
        resolve:{
            // getAllUserTestResolver: GetAllUserTestResolver
        }
    },
    // {
    //     path : 'sign-in',
    //     children: [
    //         {
    //             path: 'forgot-password',
    //             // component: AuthForgotPasswordComponent
    //         },
    //         // {
    //         //     path: 'sign-up',
    //         //     component: AuthSignUpComponent
    //         // }
    //     ]
    // }
];
