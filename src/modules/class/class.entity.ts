import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Ebd } from '../ebd/ebd.entity';
import { CheckIn } from '../ebdCheckIn/checkin.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // Relacionamento Many-to-One com o professor
  @ManyToOne(() => User, (user) => user.classesTaught)
  teacher: User;

  // Relacionamento One-to-Many com estudantes
  @OneToMany(() => User, (user) => user.class)
  students: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relacionamento One-to-Many com inscrições
  @OneToMany(() => Enrollment, (enrollment) => enrollment.class)
  enrollments: Enrollment[];

  // Método para obter todos os usuários inscritos na turma
  getUsers(): User[] {
    return this.enrollments.map((enrollment) => enrollment.user);
  }

  @ManyToOne(() => Ebd, (ebd) => ebd.classes)
  ebd: Ebd;

  @OneToMany(() => CheckIn, (checkIn) => checkIn.class)
  checkIns: CheckIn[];
}
