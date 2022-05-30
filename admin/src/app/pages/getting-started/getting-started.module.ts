import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { GettingStartedComponent } from './getting-started.component';
import { ModalCasesComponent } from './sample/modal-cases/modal-cases.component';
import { SampleComponent } from './sample/sample.component';

@NgModule({
  declarations: [GettingStartedComponent, SampleComponent, ModalCasesComponent, CategoryComponent],
  imports: [SharedModule, GettingStartedRoutingModule],
  providers: [],
})
export class GettingStartedModule {}
