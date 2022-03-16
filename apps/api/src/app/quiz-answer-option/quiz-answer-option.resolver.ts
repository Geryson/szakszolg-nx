import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { QuizAnswerOptionService } from './quiz-answer-option.service'
import { QuizAnswerOption } from './entities/quiz-answer-option.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetQuizAnswerOptionArgs } from './dto/args/get-quiz-answer-option.args'
import { IQuizAnswerOption } from '@szakszolg-nx/api-interfaces'
import { GetQuizAnswerOptionsArgs } from './dto/args/get-quiz-answer-options.args'
import { CreateQuizAnswerOptionInput } from './dto/inputs/create-quiz-answer-option.input'
import { UpdateQuizAnswerOptionInput } from './dto/inputs/update-quiz-answer-option.input'
import { DeleteQuizAnswerOptionInput } from './dto/inputs/delete-quiz-answer-option.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => QuizAnswerOption)
@Resource('quiz-answer-options')
export class QuizAnswerOptionResolver {
    constructor(private readonly service: QuizAnswerOptionService) {}

    @Query(() => QuizAnswerOption, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    quizAnswerOption(@Args({ nullable: true }) data: GetQuizAnswerOptionArgs): Promise<IQuizAnswerOption> {
        return this.service.findOne(data)
    }

    @Query(() => [QuizAnswerOption], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    quizAnswerOptions(@Args({ nullable: true }) data: GetQuizAnswerOptionsArgs | null): Promise<IQuizAnswerOption[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => QuizAnswerOption)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createQuizAnswerOption(
        @Args('createQuizAnswerOptionData') data: CreateQuizAnswerOptionInput,
    ): Promise<IQuizAnswerOption> {
        return this.service.create(data)
    }

    @Mutation(() => QuizAnswerOption)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateQuizAnswerOption(
        @Args('updateQuizAnswerOptionData') data: UpdateQuizAnswerOptionInput,
    ): Promise<IQuizAnswerOption> {
        return this.service.update(data)
    }

    @Mutation(() => QuizAnswerOption)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteQuizAnswerOption(
        @Args('deleteQuizAnswerOptionData') data: DeleteQuizAnswerOptionInput,
    ): Promise<IQuizAnswerOption> {
        return this.service.delete(data)
    }
}
