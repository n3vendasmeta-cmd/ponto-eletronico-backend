import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimeRecord } from './entities/time-record.entity';
import { TimeRecordsController } from './time-records.controller';
import { TimeRecordsService } from './time-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeRecord])],
  controllers: [TimeRecordsController],
  providers: [TimeRecordsService],
})
export class TimeRecordsModule {}
