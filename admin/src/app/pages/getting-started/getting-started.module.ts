import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/@shared/shared.module';
import { SampleComponent } from './sample/sample.component';
import { GettingStartedComponent } from './getting-started.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { ModalCasesComponent } from './sample/modal-cases/modal-cases.component';

@NgModule({
  declarations: [GettingStartedComponent, SampleComponent, ModalCasesComponent],
  imports: [SharedModule, GettingStartedRoutingModule],
  providers: [],
})
export class GettingStartedModule {}
