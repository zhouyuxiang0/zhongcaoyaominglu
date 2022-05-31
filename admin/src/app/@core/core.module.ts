import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthInterceptor } from './auth-interceptor';
import { CourseData } from './data/course';
import { CourseService } from './mock/course.service';
import { MockDataModule } from './mock/mock-data.module';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuardService } from './services/auth-guard-service.guard';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { ChineseMedicineService } from './services/chinese-medicine.service';
import { CustomThemeService } from './services/custom-theme.service';
import { MeridianTropismService } from './services/meridian-tropism.service';
import { NatureService } from './services/nature.service';
import { PersonalizeService } from './services/personalize.service';
import { TasteService } from './services/taste.service';

const DATA_SERVICES = [{ provide: CourseData, useClass: CourseService }];

export const DEVUI_CORE_PROVIDERS = [
  ...MockDataModule.forRoot().providers!,
  ...DATA_SERVICES,
  AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  PersonalizeService,
  AuthGuardService,
  CustomThemeService,
  NatureService,
  TasteService,
  MeridianTropismService,
  CategoryService,
  ChineseMedicineService,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...DEVUI_CORE_PROVIDERS],
    };
  }
}
