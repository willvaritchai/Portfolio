import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AccountProfileDetailComponent } from './account-profile-detail/account-profile-detail.component';
import { AccountProfileRoutes } from './account-profile.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AccountProfileComponent } from './account-profile.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AccountProfileCreateComponent } from './account-profile-create/account-profile-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { OtherProfileComponent } from './other-profile/other-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AccountProfileEditComponent } from './account-profile-edit/account-profile-edit.component';
import { FavouritePlacesComponent } from './account-profile-detail/favourite-places/favourite-places.component';
import { TermsAndConditionsComponent } from './account-profile-detail/terms-and-conditions/terms-and-conditions.component';
import { EmergencyContactComponent } from './account-profile-detail/emergency-contact/emergency-contact.component';
import { MatMenuModule } from '@angular/material/menu';
import { CreateFavouritePlacesComponent } from './account-profile-detail/favourite-places/create/create-favourite-places.component';
import { EventDetailModule } from '../event-detail/event-detail.module';
import { EditFavouritePlacesComponent } from './account-profile-detail/favourite-places/edit/edit-favourite-places.component';
import { NumberOnlyServiceModule } from 'src/services/number-only/NumberOnly.module';
import { NoPasteServiceModule } from 'src/services/no-paste/NoPasteService.module';


@NgModule({
  declarations: [
    AccountProfileComponent,
    AccountProfileDetailComponent,
    AccountProfileEditComponent,
    AccountProfileCreateComponent,
    OtherProfileComponent,
    FavouritePlacesComponent,
    TermsAndConditionsComponent,
    EmergencyContactComponent,
    CreateFavouritePlacesComponent,
    EditFavouritePlacesComponent
  ],
  imports: [
    RouterModule.forChild(AccountProfileRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatMenuModule,
    EventDetailModule,
    NumberOnlyServiceModule,
    NoPasteServiceModule,
  ],
  providers: [],
})
export class AccountProfileModule { }
