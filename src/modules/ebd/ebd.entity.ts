// src/ebd/ebd.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Class } from '../class/class.entity';

@Entity()
export class Ebd {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Class, (classEntity) => classEntity.ebd)
  classes: Class[];
}
