import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { TypeOrmQuizRepository } from '../TypeOrm/TypeOrmQuizRepository';
import { QuizCreate } from '../../application/usecases/QuizCreate';
import { QuizUpdate } from '../../application/usecases/QuizUpdate';
import { QuizReadById } from '../../application/usecases/QuizReadById';
import { QuizReadAll } from '../../application/usecases/QuizReadAll';
import { QuizDelete } from '../../application/usecases/QuizDelete';
import { QuestionQuizAdder } from '../../application/usecases/QuestionQuizAdder';
import { QuestionQuizRemover } from '../../application/usecases/QuestionQuizRemover';
import { StatusQuizUpdate } from '../../application/usecases/StatusQuizUpdate';

@Module({
  controllers: [QuizController],
  providers: [
    {
      provide: 'QuizCreate',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuizCreate(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuizReadAll',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuizReadAll(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuizReadById',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuizReadById(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuizUpdate',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuizUpdate(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuizDelete',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuizDelete(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuestionQuizAdder',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuestionQuizAdder(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'QuestionQuizRemover',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new QuestionQuizRemover(repository),
      inject: [TypeOrmQuizRepository],
    },
    {
      provide: 'StatusQuizUpdate',
      useFactory: (repository: TypeOrmQuizRepository) =>
        new StatusQuizUpdate(repository),
      inject: [TypeOrmQuizRepository],
    },
  ],
})
export class QuizModule {}
