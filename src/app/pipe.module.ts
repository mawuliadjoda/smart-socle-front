import { NgModule } from '@angular/core';
import { MontantFormatterPipe } from './util-component/montant-formatter.pipe';

@NgModule({
    imports:        [],
    declarations:   [MontantFormatterPipe],
    exports:        [MontantFormatterPipe],
})

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 }
