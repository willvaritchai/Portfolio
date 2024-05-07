import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { GetAllUserTestResolver, GetFavRoutesHomeResolver, LoadingResolver } from './home.resolve';
import { CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';
import { AppLoadingResolver } from 'src/app/app.resolve';

export const HomeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            getFavRoutesHomeResolver: GetFavRoutesHomeResolver
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
