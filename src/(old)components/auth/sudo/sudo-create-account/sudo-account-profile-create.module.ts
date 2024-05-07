import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SudoAccountProfileCreateRoutes } from './sudo-account-profile-create.routing';
import { SudoAccountProfileCreateComponent } from './sudo-account-profile-create.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [SudoAccountProfileCreateComponent],
  imports: [
    RouterModule.forChild(SudoAccountProfileCreateRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule
  ],
})
export class SudoAccountProfileCreateModule { }
