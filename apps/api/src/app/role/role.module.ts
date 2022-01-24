import { forwardRef, Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'
import { AuthModule } from '../auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './entities/role.entity'
import { RoleRepository } from './entities/role.repository'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [
        AuthModule,
        forwardRef(() => UsersModule),
        MongooseModule.forFeature([
            {
                name: Role.name,
                schema: RoleSchema,
            },
        ]),
    ],
    providers: [RoleResolver, RoleService, RoleRepository],
    exports: [RoleService, RoleRepository],
})
export class RoleModule {}
