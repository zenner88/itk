/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthGuard } from './auth-guard.service';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderInterceptorService } from "./service/header-interceptor.service";
import { AuthService } from "./service/auth.service";
import { ApiService } from "./service/api.service";
import { LoaderService } from "./service/loader.service";
import { Broadcaster } from "./service/broadcaster";
import { ChartsModule } from 'ng2-charts';
// import { TranslatorService } from "./service/translator.service";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [AppComponent],
  providers: [
    // ...
    AuthGuard,
    LoaderService,
    ApiService,
    AuthService,
    Broadcaster
    // TranslatorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
