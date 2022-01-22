import { Module } from '@nestjs/common'

import { AppController } from './core/app.controller'
import { AppService } from './core/app.service'
import { CoreModule } from './core/core.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { RoleModule } from './role/role.module'

@Module({
    imports: [CoreModule, UsersModule, AuthModule, RoleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
