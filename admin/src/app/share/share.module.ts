import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui';
import { LayoutModule } from 'ng-devui';
import { CardModule } from 'ng-devui/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, DevUIModule, CardModule, LayoutModule],
  exports: [DevUIModule, CardModule, LayoutModule],
})
export class ShareModule {}
