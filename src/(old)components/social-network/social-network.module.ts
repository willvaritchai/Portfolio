import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SocialNetworkComponent } from './social-network.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FriendsSuggestionComponent } from './friends-suggestion/friends-suggestion.component';
import { FriendsComponent } from './friends/friends.component';
import { MatMenuModule } from '@angular/material/menu';
import { HomeModule } from '../home(old)/home.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SocialNetworkRoutes } from './social-network.routing';


@NgModule({
  declarations: [
    SocialNetworkComponent,
    FriendsSuggestionComponent,
    FriendsComponent,
  ],
  imports: [
    RouterModule.forChild(SocialNetworkRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    MatMenuModule,
    RouterModule,
    HomeModule,
    MatProgressSpinnerModule
  ],
  providers: [],
})
export class SocialNetworkModule { }
