import { BadRequestException, Injectable } from '@nestjs/common';
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

  private validateMinimumInterval(lastRecord: TimeRecord | null): void {
    if (!lastRecord) {
      return;
    }

    const currentTime = new Date().getTime();
    const lastRecordTime = lastRecord.recordedAt.getTime();
    const elapsedTimeInMilliseconds = currentTime - lastRecordTime;
    const minimumIntervalInMilliseconds = 60 * 1000;

    if (elapsedTimeInMilliseconds < minimumIntervalInMilliseconds) {
      throw new BadRequestException(
        'Aguarde pelo menos 1 minuto antes de registrar um novo ponto.',
      );
    }
  }

  public async register(userId: string): Promise<TimeRecordResponseDto> {
    const lastRecord = await this.getLastRecord(userId);

    this.validateMinimumInterval(lastRecord);

    const nextRecordType = this.getNextRecordType(lastRecord?.type);

    const timeRecord = this.timeRecordRepository.create({
      userId,
      type: nextRecordType,
      recordedAt: new Date(),
    });

    const savedTimeRecord = await this.timeRecordRepository.save(timeRecord);

    return this.toResponseDto(savedTimeRecord);
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
