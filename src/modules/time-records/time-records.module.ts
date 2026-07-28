import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeRecord } from './entities/time-record.entity';
import { TimeRecordsService } from './time-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeRecord])],
  providers: [TimeRecordsService],
})
export class TimeRecordsModule {}
