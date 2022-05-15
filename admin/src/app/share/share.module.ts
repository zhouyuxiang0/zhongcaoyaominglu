import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevUIModule } from 'ng-devui';
import { LayoutModule } from 'ng-devui';
import { CardModule } from 'ng-devui/card';
import { FormModule } from 'ng-devui/form';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DevUIModule,
    CardModule,
    LayoutModule,
    FormModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    DevUIModule,
    CardModule,
    LayoutModule,
    FormModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
})
export class ShareModule {}
