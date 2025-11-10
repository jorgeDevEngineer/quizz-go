import { Repository } from 'typeorm';
import { QuizRepository } from '../../domain/Repository/QuizRepository';
import { InjectRepository } from '@nestjs/typeorm';
import {
  QuizId,
  QuizTitle,
  QuizDescription,
} from '../../domain/ValueObjects/QuizVO';
import { QuestionId } from '../../domain/ValueObjects/QuestionVO';
import { Quiz } from '../../domain/Quiz';
import { TypeOrmQuizEntity } from './TypeOrmQuizEntity';
import { UserId } from '../../domain/ValueObjects/UserVO';
import {
  PaginatedResult,
  PaginationOptions,
} from '../../domain/Repository/QuizRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmQuizRepository implements QuizRepository {
  constructor(
    @InjectRepository(TypeOrmQuizEntity)
    private readonly repository: Repository<TypeOrmQuizEntity>,
  ) {}

  async generateQuizId(): Promise<QuizId> {
    return Promise.resolve(QuizId.of(crypto.randomUUID()));
  }

  async generateQuestionId(): Promise<QuestionId> {
    return Promise.resolve(QuestionId.of(crypto.randomUUID()));
  }

  async create(quiz: Quiz): Promise<void> {
    const snapshot = quiz.getSnapshot();
    const entity = this.repository.create({
      id: snapshot.id,
      title: snapshot.title,
      description: snapshot.description,
      owner_id: snapshot.ownerId,
      created_at: snapshot.createdAt,
    } as unknown as TypeOrmQuizEntity);

    await this.repository.save(entity);
  }

  async update(quiz: Quiz): Promise<void> {
    const snapshot = quiz.getSnapshot();
    // Using save will perform an upsert based on primary key
    const entity = this.repository.create({
      id: snapshot.id,
      title: snapshot.title,
      description: snapshot.description,
      owner_id: snapshot.ownerId,
      created_at: snapshot.createdAt,
    } as unknown as TypeOrmQuizEntity);

    await this.repository.save(entity);
  }

  async findById(id: QuizId, ownerId: UserId): Promise<Quiz | null> {
    const entity = await this.repository.findOne({
      where: { id: id.value, owner_id: ownerId.value },
    });

    if (!entity) return null;

    // Build domain Quiz using value objects
    const quiz = Quiz.create(
      QuizId.of(entity.id),
      QuizTitle.of(entity.title),
      QuizDescription.of(entity.description),
      UserId.of(entity.owner_id),
    );

    return quiz;
  }

  async findByOwner(
    ownerId: UserId,
    pagination: PaginationOptions,
  ): Promise<PaginatedResult<Quiz>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    // Note: TypeOrmQuizEntity currently doesn't have a `state` column.
    // If later you add a state column, include it in the where clause when `state` is provided.
    const [entities, total] = await this.repository.findAndCount({
      where: { owner_id: ownerId.value },
      skip,
      take: limit,
      order: { created_at: 'DESC' },
    });

    const data = entities.map((e) =>
      Quiz.create(
        QuizId.of(e.id),
        QuizTitle.of(e.title),
        QuizDescription.of(e.description),
        UserId.of(e.owner_id),
      ),
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async delete(id: QuizId, ownerId: UserId): Promise<void> {
    await this.repository.delete({ id: id.value, owner_id: ownerId.value });
  }
}
