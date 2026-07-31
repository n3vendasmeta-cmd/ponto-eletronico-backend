import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeRecordResponseDto } from './dto/time-record-response.dto';
import { TimeRecord } from './entities/time-record.entity';
import { TimeRecordType } from './enums/time-record-type.enum';

@Injectable()
export class TimeRecordsService {
  constructor(
    @InjectRepository(TimeRecord)
    private readonly timeRecordRepository: Repository<TimeRecord>,
  ) {}

  private toResponseDto(timeRecord: TimeRecord): TimeRecordResponseDto {
    return {
      id: timeRecord.id,
      type: timeRecord.type,
      recordedAt: timeRecord.recordedAt,
      source: timeRecord.source,
      notes: timeRecord.notes ?? null,
    };
  }
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

  public async register(userId: string): Promise<TimeRecordResponseDto> {
    // Busca a última batida de ponto do usuário
    const lastRecord = await this.getLastRecord(userId);
    // Determina o próximo tipo de batida de ponto com base na última batida
    const nextRecordType = this.getNextRecordType(lastRecord?.type);

    const timeRecord = this.timeRecordRepository.create({
      userId,
      type: nextRecordType,
      recordedAt: new Date(),
    });

    const savedtimeRecord = await this.timeRecordRepository.save(timeRecord);

    return this.toResponseDto(savedtimeRecord);
  }

  public async list(userId: string): Promise<TimeRecordResponseDto[]> {
    const timeRecords = await this.timeRecordRepository.find({
      where: {
        userId,
      },
      order: {
        recordedAt: 'DESC',
      },
    });

    return timeRecords.map((timeRecord) => this.toResponseDto(timeRecord));
  }
}
