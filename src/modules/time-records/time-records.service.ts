import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeRecord } from './entities/time-record.entity';
import { TimeRecordType } from './enums/time-record-type.enum';

@Injectable()
export class TimeRecordsService {
  constructor(
    @InjectRepository(TimeRecord)
    private readonly timeRecordRepository: Repository<TimeRecord>,
  ) {}

  private getNextRecordType(lastRecordType?: TimeRecordType): TimeRecordType {
    switch (lastRecordType) {
      case TimeRecordType.CLOCK_IN:
        return TimeRecordType.BREAK_START;

      case TimeRecordType.BREAK_START:
        return TimeRecordType.BREAK_END;

      case TimeRecordType.BREAK_END:
        return TimeRecordType.CLOCK_OUT;

      default:
        return TimeRecordType.CLOCK_IN;
    }
  }

  private async getLastRecord(userId: string): Promise<TimeRecord | null> {
    return this.timeRecordRepository.findOne({
      where: { userId },
      order: {
        recordedAt: 'DESC',
      },
    });
  }

  public async register(userId: string): Promise<TimeRecord> {
    // Busca a última batida de ponto do usuário
    const lastRecord = await this.getLastRecord(userId);
    // Determina o próximo tipo de batida de ponto com base na última batida
    const nextRecordType = this.getNextRecordType(lastRecord?.type);

    const timeRecord = this.timeRecordRepository.create({
      userId,
      type: nextRecordType,
      recordedAt: new Date(),
    });

    return this.timeRecordRepository.save(timeRecord);
  }

  public async list(userId: string): Promise<TimeRecord[]> {
    return this.timeRecordRepository.find({
      where: {
        userId,
      },
      order: {
        recordedAt: 'DESC',
      },
    });
  }
}
