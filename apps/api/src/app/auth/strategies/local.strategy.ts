import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { IUser } from '@szakszolg-nx/api-interfaces'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<IUser> {
        const user = await this.authService.validate(email, password)
        console.log('user', user)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
