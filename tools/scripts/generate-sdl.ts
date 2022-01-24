import { NestFactory } from '@nestjs/core'
import { printSchema } from 'graphql'
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql'
import { UsersResolver } from '../../apps/api/src/app/users/users.resolver'
import { RoleResolver } from '../../apps/api/src/app/role/role.resolver'
import { CoreResolver } from '../../apps/api/src/app/core/core.resolver'

async function generateSchema() {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([UsersResolver, RoleResolver, CoreResolver])
    console.log(printSchema(schema))
}

generateSchema().then((r) => process.exit(0))
