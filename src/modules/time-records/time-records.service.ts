import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimeRecord } from './entities/time-record.entity';

@Injectable()
export class TimeRecordsService {
  constructor(
    @InjectRepository(TimeRecord)
    private readonly timeRecordRepository: Repository<TimeRecord>,
  ) {}
}
