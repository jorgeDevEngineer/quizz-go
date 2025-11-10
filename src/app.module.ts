import { Module } from '@nestjs/common';
import { QuizModule } from './lib/Quizz/infrastructure/NestJs/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmQuizEntity } from './lib/Quizz/infrastructure/TypeOrm/TypeOrmQuizEntity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [TypeOrmQuizEntity],
    }),
    QuizModule,
  ],
})
export class AppModule {}
