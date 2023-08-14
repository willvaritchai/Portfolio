import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthSignInComponent } from './sign-in.component';
import { authSignInRoutes } from './sign-in.routing';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthSignInComponent],
  imports: [RouterModule.forChild(authSignInRoutes),CommonModule],
  providers: [],
})
export class AuthSignInModule {}
