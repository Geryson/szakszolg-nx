import { User, UserDocument } from './user.entity'
import { CreateUserInput } from '../dto/inputs/create-user.input'
import { UpdateUserInput } from '../dto/inputs/update-user.input'
import { DeleteUserInput } from '../dto/inputs/delete-user.input'
import { GetUserArgs } from '../dto/args/get-user.args'
import { GetUsersArgs } from '../dto/args/get-users.args'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from '@szakszolg-nx/api-interfaces'
import { Types } from 'mongoose'

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    public async findAll(data: GetUsersArgs | null): Promise<IUser[]> {
        return data && Object.keys(data).length > 0
            ? Promise.all(data.ids.map((id) => this.findOne({ id: id })))
            : this.userModel.find()
    }

    public async findOne(data: GetUserArgs): Promise<IUser> {
        if (data.id) return this.userModel.findById({ _id: data.id })

        if (data.email) return this.userModel.findById({ email: data.email })

        throw new Error('Please provide either an id or an email address')
    }

    public async create(user: CreateUserInput): Promise<IUser> {
        return new this.userModel({ ...user, _id: new Types.ObjectId() }).save()
    }

    public async update(data: UpdateUserInput): Promise<IUser> {
        const user = await this.findOne({ id: data.id })

        if (!user) throw new Error('User not found')
        if (user.password !== data.password) throw new Error('Password does not match')

        if (data.newPassword && data.newPassword !== data.newPasswordConfirm)
            throw new Error('New passwords do not match')
        const id = data.id
        delete data.id

        this.userModel.findByIdAndUpdate(id, data, { new: false })
        user.updatedAt = new Date()

        return user
    }

    public async delete(data: DeleteUserInput): Promise<IUser> {
        const user = this.findOne(data)
        if (!user) throw new Error('User not found')
        this.userModel.findByIdAndDelete(data.id)
        return user
    }
}
