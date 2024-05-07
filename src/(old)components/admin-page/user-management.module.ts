import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserManagementComponent } from './user-management.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserManagementDetailComponent } from './user-management/user-management-detail/user-management-detail.component';
import { CustomDateFormatPipeModule } from 'src/services/custom-date-pipe/CustomDatePipeService.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserManagementRoutes } from './user-management.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    UserManagementListComponent,
    UserManagementDetailComponent,
    UserManagementComponent,
  ],
  imports: [
    RouterModule.forChild(UserManagementRoutes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    CustomDateFormatPipeModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [],
})
export class UserManagementModule { }
