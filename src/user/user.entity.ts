import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Role } from 'src/roles/role.entity';
import { Class } from 'src/class/class.entity';
import { Enrollment } from 'src/enrollment/enrollment.entity';
import { Schedule } from 'src/schedule/schedule.entity';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  password: string;

  @ManyToMany(() => Role, (role) => role.users)
  roles: Role[];

  @OneToMany(() => Class, (classEntity) => classEntity.teacher)
  classesTaught: Class[];

  @ManyToOne(() => Class, (classEntity) => classEntity.students)
  class: Class;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[];

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];
}
