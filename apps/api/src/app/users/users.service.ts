import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/inputs/create-user.input'
import { UpdateUserInput } from './dto/inputs/update-user.input'
import { DeleteUserInput } from './dto/inputs/delete-user.input'
import { GetUserArgs } from './dto/args/get-user.args'
import { GetUsersArgs } from './dto/args/get-users.args'
import { UserRepository } from './entities/user.repository'
import { IUser } from '@szakszolg-nx/api-interfaces'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs')

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    public findAll(data: GetUsersArgs | null): Promise<IUser[]> {
        return this.userRepository.findAll(data)
    }

    public findOne(data: GetUserArgs): Promise<IUser> {
        return this.userRepository.findOne(data)
    }

    public async create(data: CreateUserInput): Promise<IUser> {
        data.password = await bcrypt.hash(data.password, 10)
        return this.userRepository.create(data)
    }

    public async update(data: UpdateUserInput): Promise<IUser> {
        return this.userRepository.update(data)
    }

    public async delete(data: DeleteUserInput): Promise<IUser> {
        return this.userRepository.delete(data)
    }
}
