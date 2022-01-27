import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { QuizService } from './quiz.service'
import { Quiz } from './entities/quiz.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetQuizArgs } from './dto/args/get-quiz.args'
import { IQuiz } from '@szakszolg-nx/api-interfaces'
import { GetQuizzesArgs } from './dto/args/get-quizzes.args'
import { CreateQuizInput } from './dto/inputs/create-quiz.input'
import { UpdateQuizInput } from './dto/inputs/update-quiz.input'
import { DeleteQuizInput } from './dto/inputs/delete-quiz.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => Quiz)
@Resource('quizs')
export class QuizResolver {
    constructor(private readonly service: QuizService) {}

    @Query(() => Quiz, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    quiz(@Args({ nullable: true }) data: GetQuizArgs): Promise<IQuiz> {
        return this.service.findOne(data)
    }

    @Query(() => [Quiz], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    quizs(@Args({ nullable: true }) data: GetQuizzesArgs | null): Promise<IQuiz[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => Quiz)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createQuiz(@Args('createQuizData') data: CreateQuizInput): Promise<IQuiz> {
        return this.service.create(data)
    }

    @Mutation(() => Quiz)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateQuiz(@Args('updateQuizData') data: UpdateQuizInput): Promise<IQuiz> {
        return this.service.update(data)
    }

    @Mutation(() => Quiz)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteQuiz(@Args('deleteQuizData') data: DeleteQuizInput): Promise<IQuiz> {
        return this.service.delete(data)
    }
}
