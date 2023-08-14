import { Route } from "@angular/router";
import { AuthSignInComponent } from "src/components/auth/sign-in/sign-in.component";

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },

    {
        path: 'home', pathMatch: 'full',  loadChildren: () => import('src/components/home/home.module').then(m => m.HomeModule) 
    }
]