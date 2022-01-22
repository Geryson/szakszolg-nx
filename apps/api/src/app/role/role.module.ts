import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleResolver } from './role.resolver'
import { AuthModule } from '../auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Role, RoleSchema } from './entities/role.entity'
import { RoleRepository } from './entities/role.repository'

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: Role.name,
                schema: RoleSchema,
            },
        ]),
    ],
    providers: [RoleResolver, RoleService, RoleRepository],
    exports: [RoleService],
})
export class RoleModule {}
