import { Route } from "@angular/router";
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'portfolio' },
    {
        path: '',
        children: [
            { path: 'portfolio', loadChildren: () => import('src/components/home/home.module').then(m => m.HomeModule) },
        ]
    },

    // 404 & Catch all
    { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('src/app/errors/error-404/error-404.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: '404-not-found' }

]