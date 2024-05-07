import { Route } from '@angular/router';
import { ConsentComponent } from './consent.component';
import { CheckHaveUserCookieResolver } from '../home/sign-in.resolve';

export const consentRoutes: Route[] = [
  {
    path: '',
    component: ConsentComponent,
    resolve: {
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
