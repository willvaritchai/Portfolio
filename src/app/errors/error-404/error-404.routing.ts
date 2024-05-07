import { Route } from '@angular/router';
import { NotFoundComponent } from './error-404.component';

export const NotFoundRoutes: Route[] = [
    {
        path: '',
        component: NotFoundComponent
    }
];
