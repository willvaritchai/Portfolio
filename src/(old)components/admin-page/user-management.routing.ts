import { Route } from '@angular/router';
import { CheckHaveUserCookieResolver, CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { UserManagementComponent } from './user-management.component';
import { AdminGetDriverProfile, CheckUrlResolver, CountApprovalStatusResolver, LoadingResolver, UserDetailResolver, UserListResolver } from './user-management.resolve';
import { UserManagementDetailComponent } from './user-management/user-management-detail/user-management-detail.component';
import { BranchesResolver, FacultiesResolver } from '../account-profile/account-profile.resolve';

export const UserManagementRoutes: Route[] = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: 'list',
        component: UserManagementListComponent,
        resolve: {
          loadingResolver: LoadingResolver,
          // userListResolver: UserListResolver,
          countApprovalStatusResolver: CountApprovalStatusResolver,
          // checkUrlResolver: CheckUrlResolver,
        },
      },
      {
        path: 'detail/:user_id',
        component: UserManagementDetailComponent,
        resolve: {
          loadingResolver: LoadingResolver,
          getFaculties: FacultiesResolver,
          getBranches: BranchesResolver,
          // userDetailResolver: UserDetailResolver,
          // adminGetDriverProfile: AdminGetDriverProfile

        },
      },
    ]

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
