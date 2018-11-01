import { NgModule } from '@angular/core';

import { PrsprSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PrsprSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PrsprSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PrsprSharedCommonModule {}
