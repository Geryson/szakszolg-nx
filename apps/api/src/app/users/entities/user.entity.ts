import { Field, ObjectType } from '@nestjs/graphql'
import { Document, Schema as MongooseSchema, Types } from 'mongoose'
import { IRole, IUser } from '@szakszolg-nx/api-interfaces'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Role } from '../../role/entities/role.entity'
import { SchemaTypes } from 'mongoose'

export type UserDocument = User & Document

@ObjectType()
@Schema()
export class User implements IUser {
    @Field(() => String)
    @Prop({ type: MongooseSchema.Types.ObjectId })
    _id: any

    @Field()
    @Prop()
    username: string

    @Field({ nullable: true })
    @Prop()
    om?: string

    @Prop()
    password?: string

    @Field()
    @Prop()
    email: string

    @Field(() => [Role], { nullable: 'itemsAndList' })
    @Prop({ type: [SchemaTypes.ObjectId], ref: Role.name })
    roles: Types.ObjectId[] | IRole[]

    @Field()
    @Prop()
    createdAt: Date

    @Field()
    @Prop()
    updatedAt?: Date

    @Field({ nullable: true })
    @Prop()
    deletedAt?: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
