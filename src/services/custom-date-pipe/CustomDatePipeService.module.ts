import { NgModule } from "@angular/core";
import { CustomDateFormatPipe } from "./CustomDatePipeService.service";

@NgModule({
  declarations: [
    CustomDateFormatPipe
  ],
  exports: [CustomDateFormatPipe],
  imports: [
  ],
  providers: [
  ],
})
export class CustomDateFormatPipeModule { }
