import { Schedule } from 'src/schedule/schedule.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => Schedule, (schedule) => schedule.ministry)
  schedules: Schedule[];
}
