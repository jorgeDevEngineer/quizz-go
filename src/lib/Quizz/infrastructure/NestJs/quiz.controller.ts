import { Controller, Get } from '@nestjs/common';

@Controller('quiz')
export class QuizController {
  @Get()
  getHello() {
    return 'Hello from QuizController!';
  }
}
