import { Route } from '@angular/router';
import { AuthSignInComponent } from './sign-in.component';

export const authSignInRoutes: Route[] = [
    {
        path     : '',
        component: AuthSignInComponent
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
