import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SudoAlreadyHasAccRoutes } from './sudo-already-has-acc.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { SudoAlreadyHasAccComponent } from './sudo-already-has-acc.component';

@NgModule({
  declarations: [
    SudoAlreadyHasAccComponent
  ],
  imports: [
    RouterModule.forChild(SudoAlreadyHasAccRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
})
export class SudoAlreadyHasAccModule { }
