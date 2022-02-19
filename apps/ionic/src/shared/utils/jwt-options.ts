export function jwtOptionsFactory(authService: any) {
    return {
        tokenGetter: () => authService.token,
        allowedDomains: ['localhost:3000', 'localhost:4200'],
    }
}
