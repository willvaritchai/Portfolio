import { Route } from '@angular/router';

import {  LoadingResolver } from './report.resolve';
import { CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';
import { ReportComponent } from './report.component';
import { AppLoadingResolver } from 'src/app/app.resolve';

export const ReportRoutes: Route[] = [
    {
        path: '',
        children: [
            {
                path: ':id',
                component: ReportComponent,
                resolve: {
                    appLoadingResolver: AppLoadingResolver,
                    checkNotHaveUserCookieHomeResolver: CheckNotHaveUserCookieHomeResolver
                    // getAllUserTestResolver: GetAllUserTestResolver
                }
            }
        ]
    }
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
