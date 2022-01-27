import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { QuizQuestionService } from './quiz-question.service'
import { QuizQuestion } from './entities/quiz-question.entity'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { GetQuizQuestionArgs } from './dto/args/get-quiz-question.args'
import { IQuizQuestion } from '@szakszolg-nx/api-interfaces'
import { GetQuizQuestionsArgs } from './dto/args/get-quiz-questions.args'
import { CreateQuizQuestionInput } from './dto/inputs/create-quiz-question.input'
import { UpdateQuizQuestionInput } from './dto/inputs/update-quiz-question.input'
import { DeleteQuizQuestionInput } from './dto/inputs/delete-quiz-question.input'
import { Permission, Resource } from '../auth/decorators/permission.decorator'
import { PermissionGuard } from '../auth/guards/permission-guard.service'

@Resolver(() => QuizQuestion)
@Resource('quiz-questions')
export class QuizQuestionResolver {
    constructor(private readonly service: QuizQuestionService) {}

    @Query(() => QuizQuestion, { nullable: true })
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('read')
    quizQuestion(@Args({ nullable: true }) data: GetQuizQuestionArgs): Promise<IQuizQuestion> {
        return this.service.findOne(data)
    }

    @Query(() => [QuizQuestion], { nullable: 'items' })
    @Permission('browse')
    @UseGuards(GqlAuthGuard, PermissionGuard)
    quizQuestions(@Args({ nullable: true }) data: GetQuizQuestionsArgs | null): Promise<IQuizQuestion[]> {
        return this.service.findAll(data)
    }

    @Mutation(() => QuizQuestion)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('create')
    createQuizQuestion(@Args('createQuizQuestionData') data: CreateQuizQuestionInput): Promise<IQuizQuestion> {
        return this.service.create(data)
    }

    @Mutation(() => QuizQuestion)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('update')
    updateQuizQuestion(@Args('updateQuizQuestionData') data: UpdateQuizQuestionInput): Promise<IQuizQuestion> {
        return this.service.update(data)
    }

    @Mutation(() => QuizQuestion)
    @UseGuards(GqlAuthGuard, PermissionGuard)
    @Permission('delete')
    deleteQuizQuestion(@Args('deleteQuizQuestionData') data: DeleteQuizQuestionInput): Promise<IQuizQuestion> {
        return this.service.delete(data)
    }
}
