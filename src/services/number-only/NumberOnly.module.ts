import { NgModule } from "@angular/core";
import { NumberOnlyService } from "./NumberOnly.service";

@NgModule({
  declarations: [
    NumberOnlyService
  ],
  exports: [NumberOnlyService],
  imports: [
  ],
  providers: [
  ],
})
export class NumberOnlyServiceModule { }
