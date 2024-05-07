import { Route } from '@angular/router';
// import { EventDetalComponent } from './thread.component';
// import { GetEventDetalResolver, GetVehicleListResolver, LoadingResolver, ReloadResolver } from './thread.resolve';
// import { EditEventDetalComponent } from './edit/edit-event-detail.component';
// import { CreateEventDetalComponent } from './create-event/create-event-detail.component';
import { AppLoadingResolver, CheckCookieResolver } from 'src/app/app.resolve';
import { CreateEventDetalComponent } from 'src/components/event-detail/create-event/create-event-detail.component';
import { CreateThreadComponent } from './thread-create/thread-create.component';
import { ThreadComponent } from './thread.component';
import { GetAllThreadsResolver, GetPasEventResolver } from './thread.resolve';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';
import { HomeComponent } from 'src/components/home(old)/home.component';

export const ThreadRoutes: Route[] = [
    // {
    //         path: ':id',
    //         component: EventDetalComponent,
    //         resolve: {
    //             getEventDetalResolver: GetEventDetalResolver
    //         }
    // },
    // {
    //     path: '',
    //     children: [
    // {
    //     path: 'detail/:id',
    //     component: EventDetalComponent,
    //     resolve: {
    //         appLoadingResolver: AppLoadingResolver,
    //         getEventDetalResolver: GetEventDetalResolver
    //     }
    // },
    // {
    //     path:'edit/:id',
    //     component: EditEventDetalComponent,
    //     resolve: {
    //         checkCookieResolver: CheckCookieResolver,
    //         getEventDetalResolver: GetEventDetalResolver,
    //         getVehicleListResolver: GetVehicleListResolver
    //     }
    // }
    // ]
    // }

    // สำหรับ passenger ----------------------------------------------
    {
        path: 'thread',
        component: ThreadComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            getPasEventResolver: GetPasEventResolver,
            // reloadResolver: ReloadResolver

        }
    },
    {
        path: 'thread/create',
        component: CreateThreadComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            // reloadResolver: ReloadResolver

        }
    },
    {
        path: 'thread/detail',
        component: ThreadDetailComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            // getPasEventDetailResolver: GetPasEventDetailResolver,
            // reloadResolver: ReloadResolver

        }
    },

    // สำหรับ driver ----------------------------------------------
    {
        path: 'threads',
        component: ThreadComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            getAllThreadsResolver: GetAllThreadsResolver,
            // reloadResolver: ReloadResolver

        }
    },
    {
        path: 'threads/detail',
        component: ThreadDetailComponent,
        resolve: {
            appLoadingResolver: AppLoadingResolver,
            // getPasEventDetailResolver: GetPasEventDetailResolver,
            // reloadResolver: ReloadResolver
        }
    },
];
