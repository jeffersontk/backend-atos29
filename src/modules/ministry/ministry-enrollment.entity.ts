import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Ministry } from '../ministry/ministry.entity';

@Entity()
export class MinistryEnrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ministryId: number;

  @ManyToOne(() => User, (user) => user.ministryEnrollments)
  user: User;

  @ManyToOne(() => Ministry, (ministry) => ministry.enrollments)
  ministry: Ministry;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
