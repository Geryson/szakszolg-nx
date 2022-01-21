import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validate(email: string, password: string): Promise<IUser | null> {
        const user = await this.userService.findOne({ email })
        return user ? (user.password !== password ? null : user) : null
    }

    async login(user: IUser) {
        const payload = { email: user.email, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_SECRET'),
                expiresIn: this.configService.get('JWT_EXPIRES'),
            }),
        }
    }

    async verify(token: string) {
        const decoded = this.jwtService.verify(token, { secret: this.configService.get('JWT_SECRET')! })
        const user = await this.userService.findOne({ email: decoded.email })
        if (!user) throw new Error('User not found')
        return user
    }
}
