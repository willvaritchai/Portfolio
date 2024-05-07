import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlreadyHasAccRoutes } from './already-has-acc.routing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AlreadyHasAccComponent } from './already-has-acc.component';

@NgModule({
  declarations: [
    AlreadyHasAccComponent
  ],
  imports: [
    RouterModule.forChild(AlreadyHasAccRoutes),
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
export class AlreadyHasAccModule { }
