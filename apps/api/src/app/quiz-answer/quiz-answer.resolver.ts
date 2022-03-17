import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { QuizAnswerService } from './quiz-answer.service'
import { QuizAnswer } from './entities/quiz-answer.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetQuizAnswerArgs } from './dto/args/get-quiz-answer.args'
import { IQuizAnswer } from '@szakszolg-nx/api-interfaces'
import { GetQuizAnswersArgs } from './dto/args/get-quiz-answers.args'
import { CreateQuizAnswerInput } from './dto/inputs/create-quiz-answer.input'
import { UpdateQuizAnswerInput } from './dto/inputs/update-quiz-answer.input'
import { DeleteQuizAnswerInput } from './dto/inputs/delete-quiz-answer.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'
import { CreateManyQuizAnswersInput } from './dto/inputs/create-many-quiz-answers.input'

@Resolver(() => QuizAnswer)
@Resource('quiz-answers')
export class QuizAnswerResolver {
    constructor(private readonly service: QuizAnswerService) {}

    @Query(() => QuizAnswer, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    quizAnswer(@Args({ nullable: true }) data: GetQuizAnswerArgs): Promise<IQuizAnswer> {
        return this.service.findOne(data)
    }

    @Query(() => [QuizAnswer], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    quizAnswers(@Args({ nullable: true }) data: GetQuizAnswersArgs | null): Promise<IQuizAnswer[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => [QuizAnswer], { nullable: true })
    createManyQuizAnswers(@Args('createQuizAnswerData') data: CreateManyQuizAnswersInput): Promise<IQuizAnswer[]> {
        return this.service.createMany(data)
    }

    @Mutation(() => QuizAnswer)
    createQuizAnswer(@Args('createQuizAnswerData') data: CreateQuizAnswerInput): Promise<IQuizAnswer> {
        return this.service.create(data)
    }

    @Mutation(() => QuizAnswer)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateQuizAnswer(@Args('updateQuizAnswerData') data: UpdateQuizAnswerInput): Promise<IQuizAnswer> {
        return this.service.update(data)
    }

    @Mutation(() => QuizAnswer)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteQuizAnswer(@Args('deleteQuizAnswerData') data: DeleteQuizAnswerInput): Promise<IQuizAnswer> {
        return this.service.delete(data)
    }
}
