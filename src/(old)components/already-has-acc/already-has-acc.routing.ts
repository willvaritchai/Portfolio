import { Route } from '@angular/router';
import { AlreadyHasAccComponent } from './already-has-acc.component';
import { CheckHaveUserCookieResolver } from '../home/sign-in.resolve';

export const AlreadyHasAccRoutes: Route[] = [
  {
    path: '',
    component: AlreadyHasAccComponent,
    resolve: {
      checkHaveUserCookieHomeResolver: CheckHaveUserCookieResolver
    }


  },

];
