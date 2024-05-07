import { Route } from '@angular/router';
import { DriverRegisterComponent } from './driver-register.component';
import { DriverSettingComponent } from './driver-setting/driver-setting.component';
import { GetDriverProfile, LoadingResolver } from './driver-register.resolve';
import { CheckHaveUserCookieResolver } from '../home/sign-in.resolve';
import { AppLoadingResolver } from 'src/app/app.resolve';
export const DriverRegisterRoutes: Route[] = [
    // {
    //         path: ':id',
    //         component: EventDetalComponent,
    //         resolve: {
    //             getEventDetalResolver: GetEventDetalResolver
    //         }
    // },
    {
        path: '',
        component: DriverRegisterComponent,
        children: [
          {
            path: 'driver-profile',
            component: DriverSettingComponent,
            resolve: {
              appLoadingResolver: AppLoadingResolver,
              // getDriverProfile: GetDriverProfile,
            //   getFaculties: FacultiesResolver,
            //   getBranches: BranchesResolver
            },
          },
        //   {
        //     path: 'detail',
        //     component: AccountProfileDetailComponent,
        //     resolve: {
        //       loadingResolver: LoadingResolver,
        //       checkCookieResolver: CheckNotHaveUserCookieHomeResolver,
        //       userAccountResolver: UserAccountResolver,

        //     },
        //   },
        ]

    },
];
