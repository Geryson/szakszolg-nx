import { Module, forwardRef } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { MongooseModule } from '@nestjs/mongoose'
import { UserRepository } from './entities/user.repository'
import { AuthModule } from '../auth/auth.module'
import { User, UserSchema } from './entities/user.entity'

@Module({
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    providers: [UsersResolver, UsersService, UserRepository],
    exports: [UsersService],
})
export class UsersModule {}
