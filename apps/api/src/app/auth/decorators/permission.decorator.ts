import { SetMetadata } from '@nestjs/common'

export const Permission = (...abilities: string[]) => SetMetadata('abilities', abilities)
export const Resource = (...resources: string[]) => SetMetadata('resources', resources)
