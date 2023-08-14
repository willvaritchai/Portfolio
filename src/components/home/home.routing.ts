import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { GetAllUserTestResolver } from './home.resolve';

export const HomeRoutes: Route[] = [
    {
        path     : '',
        component: HomeComponent,
        resolve:{
            getAllUserTestResolver: GetAllUserTestResolver
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
