import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Schedule } from '../schedule/schedule.entity';
import { Role } from '../roles/role.entity';
import { Class } from '../class/class.entity';
import { MinistryEnrollment } from '../ministry/ministry-enrollment.entity';
import { CheckIn } from '../ebdCheckIn/checkin.entity';

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

  @Column({ nullable: false })
  @IsNotEmpty()
  role: string;

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

  @OneToMany(
    () => MinistryEnrollment,
    (ministryEnrollment) => ministryEnrollment.user,
  )
  ministryEnrollments: MinistryEnrollment[];

  @OneToMany(() => CheckIn, (checkIn) => checkIn.user)
  checkIns: CheckIn[];
}
