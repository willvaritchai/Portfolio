import { Route } from '@angular/router';
import { SocialNetworkComponent } from './social-network.component';
import { FriendListResolver, FriendRequestResolver, FriendSearchListResolver, FriendSuggestionListResolver } from './social-network.resolve';
import { LoadingResolver } from '../account-profile/account-profile.resolve';
import { FriendsSuggestionComponent } from './friends-suggestion/friends-suggestion.component';
import { FriendsComponent } from './friends/friends.component';
import { CheckHaveUserCookieResolver, CheckNotHaveUserCookieHomeResolver } from '../home/sign-in.resolve';

export const SocialNetworkRoutes: Route[] = [
  {
    path: '',
    component: SocialNetworkComponent,
    children: [
      {
        path: 'friends/suggestion',
        component: FriendsSuggestionComponent,
        resolve: {
          loadingResolver: LoadingResolver,
          friendSuggestionListResolver: FriendSuggestionListResolver,
        },
      },
      {
        path: 'friends/list',
        component: FriendsComponent,
        resolve: {
          loadingResolver: LoadingResolver,
          friendListResolver: FriendListResolver,
          checkCookieResolver: CheckNotHaveUserCookieHomeResolver,
          friendRequestResolver: FriendRequestResolver,
        },
      },
      {
        path: 'friends/search',
        component: FriendsSuggestionComponent,
        resolve: {
          loadingResolver: LoadingResolver,
          checkCookieResolver: CheckNotHaveUserCookieHomeResolver,
          friendSearchListResolver: FriendSearchListResolver,
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

