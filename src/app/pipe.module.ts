import { NgModule, ModuleWithProviders } from '@angular/core';
import { JsonPipePipe } from './util/json-pipe.pipe';
import { MontantFormatterPipe } from './util/util-component/montant-formatter.pipe';

@NgModule({
    imports:        [],
    declarations:   [MontantFormatterPipe,
                    JsonPipePipe
                    ],

    exports:        [MontantFormatterPipe,
                     JsonPipePipe
                    ],

    providers:   [MontantFormatterPipe,
                  JsonPipePipe
                 ]
})

 export class PipeModule {

   static forRoot(): ModuleWithProviders<PipeModule> {
    return {
        ngModule: PipeModule,
        providers: [],
    };
}
 }
