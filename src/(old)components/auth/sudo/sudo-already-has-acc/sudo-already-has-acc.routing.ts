import { Route } from '@angular/router';
import { SudoAlreadyHasAccComponent } from './sudo-already-has-acc.component';
import { CheckHaveUserCookieResolver } from '../../../home/sign-in.resolve';

export const SudoAlreadyHasAccRoutes: Route[] = [
  {
    path: '',
    component: SudoAlreadyHasAccComponent,
    resolve: {
      checkHaveUserCookieHomeResolver: CheckHaveUserCookieResolver
    }


  },

];
