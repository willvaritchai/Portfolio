import { Route } from '@angular/router';
import { EventDetalComponent } from './event-detail.component';
import { GetEventDetalResolver, GetVehicleListResolver, LoadingResolver, ReloadResolver } from './event-detail.resolve';
import { EditEventDetalComponent } from './edit/edit-event-detail.component';
import { CreateEventDetalComponent } from './create-event/create-event-detail.component';
import { AppLoadingResolver, CheckCookieResolver } from 'src/app/app.resolve';

export const EventDetalRoutes: Route[] = [
    // {
    //         path: ':id',
    //         component: EventDetalComponent,
    //         resolve: {
    //             getEventDetalResolver: GetEventDetalResolver
    //         }
    // },
    {
        path: '',
        children: [
            {
                path: 'detail/:id',
                component: EventDetalComponent,
                resolve: {
                    appLoadingResolver: AppLoadingResolver,
                    getEventDetalResolver: GetEventDetalResolver
                }
            },
            {
                path:'edit/:id',
                component: EditEventDetalComponent,
                resolve: {
                    checkCookieResolver: CheckCookieResolver,
                    getEventDetalResolver: GetEventDetalResolver,
                    getVehicleListResolver: GetVehicleListResolver
                }
            },{
                path:'create',
                component: CreateEventDetalComponent,
                resolve: {
                    appLoadingResolver: AppLoadingResolver,
                    // reloadResolver: ReloadResolver

                }
            }
        ]
    }
];
