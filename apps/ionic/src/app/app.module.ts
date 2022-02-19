import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router, RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core'
import {
    APOLLO_CLIENT,
    AUTH_SERVICE,
    AuthService,
    createTranslateLoader,
    DefaultInterceptor,
    ENVIRONMENT,
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
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { StaticService } from '../shared/services/static.service'
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { api } from '@szakszolg-nx/shared-module'
import { environment } from '../environments/environment'
import { jwtOptionsFactory } from '../shared/utils/jwt-options'
import { MirrorWordService } from '../shared/services/mirror-word.service'

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
        { provide: AUTH_SERVICE, useClass: AuthService },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        { provide: ENVIRONMENT, useValue: environment },
        { provide: APOLLO_CLIENT, useClass: Apollo },
        ConfirmationService,
        { provide: STORAGE_SERVICE, useClass: StorageService },
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: api('graphql', environment),
                    }),
                }
            },
            deps: [HttpLink],
        },
        StorageService,
        StaticService,
        MessageService,
        MirrorWordService,
        AlertService,
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
