import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SchoolService } from './school.service'
import { School } from './entities/school.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetSchoolArgs } from './dto/args/get-school.args'
import { ISchool } from '@szakszolg-nx/api-interfaces'
import { GetSchoolsArgs } from './dto/args/get-schools.args'
import { CreateSchoolInput } from './dto/inputs/create-school.input'
import { UpdateSchoolInput } from './dto/inputs/update-school.input'
import { DeleteSchoolInput } from './dto/inputs/delete-school.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => School)
@Resource('schools')
export class SchoolResolver {
    constructor(private readonly service: SchoolService) {}

    @Query(() => School, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    school(@Args({ nullable: true }) data: GetSchoolArgs): Promise<ISchool> {
        return this.service.findOne(data)
    }

    @Query(() => [School], { nullable: 'items' })
    schools(@Args({ nullable: true }) data: GetSchoolsArgs | null): Promise<ISchool[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => School)
    createSchool(@Args('createSchoolData') data: CreateSchoolInput): Promise<ISchool> {
        return this.service.create(data)
    }

    @Mutation(() => School)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateSchool(@Args('updateSchoolData') data: UpdateSchoolInput): Promise<ISchool> {
        return this.service.update(data)
    }

    @Mutation(() => School)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteSchool(@Args('deleteSchoolData') data: DeleteSchoolInput): Promise<ISchool> {
        return this.service.delete(data)
    }
}
