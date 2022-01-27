import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { School, SchoolDocument } from './school.entity'
import { Model } from 'mongoose'
import { UpdateSchoolInput } from '../dto/inputs/update-school.input'
import { CreateSchoolInput } from '../dto/inputs/create-school.input'
import { GetSchoolsArgs } from '../dto/args/get-schools.args'
import { GetSchoolArgs } from '../dto/args/get-school.args'
import { ISchool } from '@szakszolg-nx/api-interfaces'
import { DeleteSchoolInput } from '../dto/inputs/delete-school.input'
import { SimpleRepository } from '../../../shared/proxies/simple.repository'

@Injectable()
export class SchoolRepository extends SimpleRepository<
    SchoolDocument,
    ISchool,
    GetSchoolArgs,
    GetSchoolsArgs,
    CreateSchoolInput,
    UpdateSchoolInput,
    DeleteSchoolInput
> {
    constructor(@InjectModel(School.name) resourceModel: Model<SchoolDocument>) {
        super(resourceModel)
    }

    override async findAll(data: GetSchoolsArgs | null): Promise<ISchool[]> {
        if (!data.om && !data.name && !data.address && !data.county && !data.type) return super.findAll(data) // Simple findAll, no filtering

        const filters = {}
        for (const filterKey in data) {
            if (data[filterKey] && data[filterKey] !== 'type')
                filters[filterKey] = {
                    $regex: data[filterKey],
                    $options: 'i',
                }
        }

        if (data.type) filters['types'] = { $regex: data.type, $options: 'i' }

        return this.model.find(filters).exec()
    }
}
