import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router, RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy, NavController } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core'
import {
    createTranslateLoader,
    DefaultInterceptor,
    RedirectService,
    SharedModule,
    STORAGE_SERVICE,
} from '@szakszolg-nx/shared-module'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api'
import { CommonModule, DatePipe } from '@angular/common'
import { StorageService } from '../shared/services/storage.service'
import { AlertService } from '../shared/services/alert.service'
import { AuthService } from '../shared/services/auth.service'
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { StaticService } from '../shared/services/static.service'

export function jwtOptionsFactory(authService: AuthService) {
    return {
        tokenGetter: () => {
            return authService.token
        },
        allowedDomains: ['localhost:3000', 'localhost:4200'],
    }
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            defaultLanguage: 'hu',
        }),
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [AuthService],
            },
        }),
        ToastModule,
        ConfirmDialogModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ConfirmationService,
        { provide: STORAGE_SERVICE, useClass: StorageService },
        StorageService,
        StaticService,
        MessageService,
        AlertService,
        RedirectService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useFactory: (router: Router, storage: StorageService, redirect: RedirectService) =>
                new DefaultInterceptor(storage, router, redirect),
            multi: true,
            deps: [Router, StorageService, RedirectService],
        },
        TranslatePipe,
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
