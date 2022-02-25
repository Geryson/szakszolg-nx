import { CanActivate, ExecutionContext, flatten, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { Log } from '@szakszolg-nx/shared-module'

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext) {
        const requiredResource = this.reflector.getAllAndMerge<string[]>('resources', [
            context.getClass(),
            context.getHandler(),
        ])
        const requiredAbilities = this.reflector.get<string[]>('abilities', context.getHandler())
        if (requiredAbilities?.length == 0 && requiredResource?.length == 0) return true
        const required = `${requiredAbilities[0]}::${requiredResource[0]}`
        let user: IUser
        if (context.getType() === 'http') user = context.switchToHttp().getRequest().user
        user = GqlExecutionContext.create(context).getContext().req.user
        if (!user) return false
        Logger.warn(`${user.email} is trying to access ${required} with roles ${JSON.stringify(user.roles)}`)
        const userPermissions = flatten(user.roles.map((role) => role.permissions ?? [])).map((permission: string) =>
            permission.replace(/^\*::/g, `${requiredAbilities[0]}::`).replace(/::\*$/g, `::${requiredResource[0]}`),
        )

        return userPermissions.includes(required)
    }
}
