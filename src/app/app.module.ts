/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./@core/core.module";
import { ThemeModule } from "./@theme/theme.module";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing.component";
import { AppRoutingModule } from "./app-routing.module";
import { AuthGuard } from "./auth-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderInterceptorService } from "./service/header-interceptor.service";
import { AuthService } from "./service/auth.service";
import { ApiService } from "./service/api.service";
import { LoaderService } from "./service/loader.service";
import { Broadcaster } from "./service/broadcaster";
import { ChartsModule } from "ng2-charts";
import { NgxDocViewerModule } from "ngx-doc-viewer";

import { BlockUIModule } from "ng-block-ui";

import {
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbStepperModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbDialogModule,
  NbChatModule
} from "@nebular/theme";

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
      messageGoogleMapKey: "AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY"
    }),
    CoreModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxDocViewerModule,
    NbMenuModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbTreeGridModule,
    NbStepperModule,
    BlockUIModule.forRoot()
  ],
  declarations: [AppComponent, LandingComponent],
  providers: [
    // ...
    AuthGuard,
    LoaderService,
    ApiService,
    AuthService,
    Broadcaster
    // TranslatorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
