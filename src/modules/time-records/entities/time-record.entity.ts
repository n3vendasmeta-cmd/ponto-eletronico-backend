import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TimeRecordSource } from '../enums/time-record-source.enum';
import { TimeRecordType } from '../enums/time-record-type.enum';

@Entity('time_records')
@Index('IX_time_records_user_id_recorded_at', ['userId', 'recordedAt'])
export class TimeRecord {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id!: string;

  @Column({ name: 'user_id', type: 'bigint' })
  userId!: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'varchar', length: 30 })
  type!: TimeRecordType;

  @Column({ name: 'recorded_at', type: 'datetime2' })
  recordedAt!: Date;

  @Column({ type: 'varchar', length: 20, default: TimeRecordSource.WEB })
  source!: TimeRecordSource;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime2' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime2' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime2', nullable: true })
  deletedAt?: Date;
}
