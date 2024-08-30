import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Class } from '../class/class.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Check-ins')
@Entity('checkins')
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.checkIns)
  user: User;

  @ManyToOne(() => Class, (classEntity) => classEntity.checkIns)
  class: Class;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
