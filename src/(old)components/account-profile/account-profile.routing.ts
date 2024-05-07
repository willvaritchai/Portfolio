import { Route } from '@angular/router';
import { AllFavRouteResolver, BranchesResolver, CheckUrlResolver, FacultiesResolver, GetEmergencyContact, GetFavRoutesDetail, LoadingResolver, OtherProfileResolver } from './account-profile.resolve';
import { AccountProfileComponent } from './account-profile.component';
import { AccountProfileDetailComponent } from './account-profile-detail/account-profile-detail.component';
import { AccountProfileCreateComponent } from './account-profile-create/account-profile-create.component';
import { CheckHaveUserCookieResolver, CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';
import { AppLoadingResolver } from 'src/app/app.resolve';
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { AccountProfileEditComponent } from './account-profile-edit/account-profile-edit.component';
import { FavouritePlacesComponent } from './account-profile-detail/favourite-places/favourite-places.component';
import { EmergencyContactComponent } from './account-profile-detail/emergency-contact/emergency-contact.component';
import { TermsAndConditionsComponent } from './account-profile-detail/terms-and-conditions/terms-and-conditions.component';
import { CreateFavouritePlacesComponent } from './account-profile-detail/favourite-places/create/create-favourite-places.component';
import { EditFavouritePlacesComponent } from './account-profile-detail/favourite-places/edit/edit-favourite-places.component';
import { GetVehicleListResolver } from '../event-detail/event-detail.resolve';

export const AccountProfileRoutes: Route[] = [
  {
    path: '',
    component: AccountProfileComponent,
    children: [
      {
        path: 'create-user',
        component: AccountProfileCreateComponent,
        resolve: {
          // appLoadingResolver: AppLoadingResolver,
          checkUrlResolver: CheckUrlResolver,
          checkCookieResolver: CheckHaveUserCookieResolver,
          getFaculties: FacultiesResolver,
          getBranches: BranchesResolver
        },
      },
      {
        path: 'detail',
        component: AccountProfileDetailComponent,
        resolve: {
          appLoadingResolver: AppLoadingResolver,
          // userAccountResolver: UserAccountResolver,

        },
      },
      {
        path: 'edit',
        component: AccountProfileEditComponent,
        resolve: {
          appLoadingResolver: AppLoadingResolver,
          // userAccountResolver: UserAccountResolver,

        },
      },
      {
        path: 'other-profile/:id',
        component: OtherProfileComponent,
        resolve: {
          appLoadingResolver: AppLoadingResolver,
          otherProfileResolver: OtherProfileResolver,
          // userAccountResolver: UserAccountResolver,

        },
      },
      {
        path: 'favourite-routes',
        children: [
          {
            path: '',
            component: FavouritePlacesComponent,
            resolve: {
              appLoadingResolver: AppLoadingResolver,
              allFavRouteResolver: AllFavRouteResolver,
              // userAccountResolver: UserAccountResolver,

            },
          },
          {
            path: 'create',
            component: CreateFavouritePlacesComponent,
            resolve: {
              appLoadingResolver: AppLoadingResolver,
              // allFavRouteResolver: AllFavRouteResolver,
            },
          },
          {
            path: 'edit/:id',
            component: EditFavouritePlacesComponent,
            resolve: {
              appLoadingResolver: AppLoadingResolver,
              getFavRoutesDetail: GetFavRoutesDetail,
              getVehicleListResolver: GetVehicleListResolver
            },
          }
        ]
      },

      {
        path: 'emergency-contact',
        component: EmergencyContactComponent,
        resolve: {
          appLoadingResolver: AppLoadingResolver,
          getEmergencyContact: GetEmergencyContact,
          // userAccountResolver: UserAccountResolver,

        },
      },
      {
        path: 'terms-conditions',
        component: TermsAndConditionsComponent,
        resolve: {
          // appLoadingResolver: AppLoadingResolver,
          // otherProfileResolver: OtherProfileResolver,
          // userAccountResolver: UserAccountResolver,

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
