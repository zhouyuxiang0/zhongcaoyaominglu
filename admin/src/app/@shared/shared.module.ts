import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  AccordionModule,
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CascaderModule,
  DataTableModule,
  DCommonModule,
  DrawerModule,
  DropDownModule,
  FormModule,
  LayoutModule,
  ModalModule,
  MultiAutoCompleteModule,
  PaginationModule,
  RadioModule,
  SearchModule,
  SelectModule,
  TabsModule,
  TagsInputModule,
  TagsModule,
  TextInputModule,
  ToastModule,
  ToggleModule,
  TooltipModule,
  TreeModule,
} from 'ng-devui';
import { I18nModule } from 'ng-devui/i18n';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { HeaderOperationComponent } from './components/header/header-operation/header-operation.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PersonalizeComponent } from './components/personalize/personalize.component';
import { RegisterComponent } from './components/register/register.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { DaGridModule } from './layouts/da-grid';
import { JoinPipe } from './pipe/join.pipe';
import { MapPipe } from './pipe/map.pipe';

const DEVUI_MODULES = [
  LayoutModule,
  AccordionModule,
  SearchModule,
  AvatarModule,
  BadgeModule,
  DropDownModule,
  FormModule,
  TabsModule,
  TextInputModule,
  ToggleModule,
  ButtonModule,
  DrawerModule,
  BreadcrumbModule,
  RadioModule,
  ModalModule,
  CascaderModule,
  SelectModule,
  CardModule,
  TagsInputModule,
  DataTableModule,
  PaginationModule,
  TagsModule,
  TreeModule,
  TooltipModule,
  MultiAutoCompleteModule,
];
const COMPONENTS = [HeaderComponent, FooterComponent, NavbarComponent, PersonalizeComponent];
const PROVIDERS = [MapPipe, JoinPipe];
@NgModule({
  declarations: [
    LoginComponent,
    HeaderOperationComponent,
    HeaderLogoComponent,
    SideMenuComponent,
    RegisterComponent,
    ...COMPONENTS,
    ...PROVIDERS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    DCommonModule,
    AlertModule,
    ClipboardModule,
    ToastModule,
    TooltipModule,
    I18nModule,
    DaGridModule,
    ...DEVUI_MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    HeaderLogoComponent,
    HeaderOperationComponent,
    I18nModule,
    DaGridModule,
    SideMenuComponent,
    ...DEVUI_MODULES,
    ...COMPONENTS,
    ...PROVIDERS,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
