import { NgModule, ModuleWithProviders } from '@angular/core';
import { MontantFormatterPipe } from './util-component/montant-formatter.pipe';

@NgModule({
    imports:        [],
    declarations:   [MontantFormatterPipe],
    exports:        [MontantFormatterPipe],
})

 export class PipeModule {

   static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        ngModule: PipeModule,
        providers: [],
    };
}
 }
