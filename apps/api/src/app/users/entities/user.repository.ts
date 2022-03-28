import { User, UserDocument } from './user.entity'
import { CreateUserInput } from '../dto/inputs/create-user.input'
import { UpdateUserInput } from '../dto/inputs/update-user.input'
import { DeleteUserInput } from '../dto/inputs/delete-user.input'
import { GetUserArgs } from '../dto/args/get-user.args'
import { GetUsersArgs } from '../dto/args/get-users.args'
import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IRole, IUser } from '@szakszolg-nx/api-interfaces'
import { Types } from 'mongoose'
import { Role, RoleDocument } from '../../role/entities/role.entity'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs')

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
    ) {}

    public async findAll(data: GetUsersArgs | null): Promise<IUser[] & { roles?: IRole[] }> {
        return data && Object.keys(data).length > 0
            ? Promise.all(data.ids.map((id) => this.findOne({ id })))
            : this.userModel.find({ deletedAt: { $eq: null } }).populate('roles')
    }

    public async findOne(data: GetUserArgs): Promise<IUser> {
        if (data.id) return this.userModel.findById(data.id).populate('roles')

        if (data.email) return this.userModel.findOne({ email: data.email }).populate('roles')

        throw new Error('Please provide either an id or an email address')
    }

    public async create(data: CreateUserInput): Promise<IUser> {
        return new this.userModel({
            ...data,
            _id: new Types.ObjectId(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }).save()
    }

    public async update(data: UpdateUserInput): Promise<IUser> {
        const user = await this.userModel.findById(data.id)

        if (!user) throw new Error('User not found')
        if (!(await bcrypt.compare(data.password, user.password)))
            throw new BadRequestException('Current password is incorrect')

        if (data.newPassword && data.newPassword !== data.newPasswordConfirm)
            throw new Error('New passwords do not match')

        if (data.newPassword) {
            data.password = await bcrypt.hash(data.newPassword, 10)
        }
        // const id = data.id
        delete data.id
        ;(data as any).updatedAt = new Date()

        //if (data.roles?.length) user.roles = data?.roles?.map((roleId) => new Types.ObjectId(roleId))
        for (const key in data) {
            if (key === 'newPassword' || key === 'newPasswordConfirm' || key === 'roles' || key === 'password') continue
            user[key] = data[key]
        }
        user.save()
        return user
    }

    public async delete(data: DeleteUserInput): Promise<IUser> {
        return this.userModel.findByIdAndUpdate(data.id, { deletedAt: new Date() })
    }
}
