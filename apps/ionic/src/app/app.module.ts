import { Injector, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { Router, RouteReuseStrategy } from '@angular/router'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { ToastModule } from 'primeng/toast'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService, MessageService } from 'primeng/api'
import { CommonModule, DatePipe } from '@angular/common'
import { StorageService } from '../shared/services/storage.service'
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular'
import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'
import { jwtOptionsFactory } from '../shared/utils/jwt-options'
import { Drivers } from '@ionic/storage'
import { NxSharedModule } from '../shared/nx-shared.module'
import { AngularCropperjsModule } from 'angular-cropperjs'
import { createTranslateLoader } from '../shared/utils/translate-loader.factory'
import { AuthService } from '../shared/services/auth.service'
import { APOLLO_CLIENT, STORAGE_SERVICE } from '../shared/injector.tokens'
import { DefaultInterceptor } from '../shared/interceptors/default.interceptor'
import { RedirectService } from '../shared/services/redirect.service'
import { api } from '../shared/utils/uri.tools'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx'
import { PuzzleService } from '../shared/services/puzzle.service'

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot({ name: '_szakszolg', driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] }),
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NxSharedModule,
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
        { provide: APOLLO_CLIENT, useClass: Apollo },
        ConfirmationService,
        { provide: STORAGE_SERVICE, useClass: StorageService },
        {
            provide: APOLLO_OPTIONS,
            useFactory: (httpLink: HttpLink) => {
                return {
                    cache: new InMemoryCache(),
                    link: httpLink.create({
                        uri: api('graphql'),
                    }),
                }
            },
            deps: [HttpLink],
        },
        AngularCropperjsModule,
        ScreenOrientation,
        PuzzleService,
        MessageService,
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
export class AppModule {
    constructor(private readonly injector: Injector) {
        APP_INJECTOR = this.injector
    }
}

export let APP_INJECTOR: Injector
