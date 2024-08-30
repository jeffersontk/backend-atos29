import { Schedule } from '../schedule/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MinistryEnrollment } from './ministry-enrollment.entity';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Schedule, (schedule) => schedule.ministry)
  schedules: Schedule[];

  @OneToMany(
    () => MinistryEnrollment,
    (ministryEnrollment) => ministryEnrollment.ministry,
  )
  enrollments: MinistryEnrollment[];
}
