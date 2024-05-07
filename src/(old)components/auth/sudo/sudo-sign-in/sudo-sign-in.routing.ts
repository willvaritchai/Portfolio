import { Route } from '@angular/router';
import { SudoSignInComponent } from './sudo-sign-in.component';
import { CheckHaveUserCookieResolver, CheckLogoutResolver } from './sudo-sign-in.resolve';

export const SudoSignInRoutes: Route[] = [
  {
    path: '',
    component: SudoSignInComponent,
    resolve: {
      // checkLogoutResolver: CheckLogoutResolver,
      checkCookieResolver: CheckHaveUserCookieResolver
    },
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
