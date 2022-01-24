import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    if (context.getType() === 'http') return context.switchToHttp().getRequest().user
    return GqlExecutionContext.create(context).getContext().req.user
})
