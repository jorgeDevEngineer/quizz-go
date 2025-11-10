import { Module } from '@nestjs/common';
import { QuizModule } from './lib/Quizz/infrastructure/NestJs/quiz.module';

@Module({
  imports: [QuizModule],
})
export class AppModule {}
