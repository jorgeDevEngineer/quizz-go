import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('quiz')
export class TypeOrmQuizEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  owner_id: string;

  @Column()
  created_at: Date;
}

//private _questions: QuestionList; // Usar el Value Object
