import { Route } from '@angular/router';
import { SudoAccountProfileCreateComponent } from './sudo-account-profile-create.component';
import { BranchesResolver, FacultiesResolver } from 'src/components/account-profile/account-profile.resolve';

export const SudoAccountProfileCreateRoutes: Route[] = [
  {
    path: '',
    component: SudoAccountProfileCreateComponent,
    resolve: {
      getFaculties: FacultiesResolver,
      getBranches: BranchesResolver
      // checkLogoutResolver: CheckLogoutResolver,
      // checkCookieResolver: CheckHaveUserCookieResolver
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
