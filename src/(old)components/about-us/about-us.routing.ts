import { Route } from '@angular/router';
import { GetAllUserTestResolver, GetFavRoutesHomeResolver, LoadingResolver } from './about-us.resolve';
import { CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';
import { AppLoadingResolver } from 'src/app/app.resolve';
import { AboutUsComponent } from './about-us.component';

export const AboutUsRoutes: Route[] = [
    {
        path: '',
        component: AboutUsComponent,
        resolve: {
            // appLoadingResolver: AppLoadingResolver,
            // getFavRoutesHomeResolver: GetFavRoutesHomeResolver
            // checkNotHaveUserCookieHomeResolver: CheckNotHaveUserCookieHomeResolver

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
