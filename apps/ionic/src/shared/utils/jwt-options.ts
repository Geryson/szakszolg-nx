import { AuthService } from '@szakszolg-nx/shared-module'

export function jwtOptionsFactory(authService: AuthService) {
    return {
        tokenGetter: () => authService.token,
        allowedDomains: ['localhost:3000', 'localhost:4200'],
    }
}
