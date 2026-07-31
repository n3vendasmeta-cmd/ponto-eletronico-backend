import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiOkResponse } from '@nestjs/swagger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { TimeRecordResponseDto } from './dto/time-record-response.dto';
import { TimeRecordsService } from './time-records.service';
@ApiTags('Time Records')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('time-records')
export class TimeRecordsController {
  constructor(private readonly timeRecordsService: TimeRecordsService) {}

  @ApiOperation({
    summary: 'Register a new time record',
  })
  @ApiOkResponse({
    description: 'Time record successfully registered',
    type: TimeRecordResponseDto,
  })
  @Post('register')
  register(@CurrentUser() user: User) {
    return this.timeRecordsService.register(user.id);
  }

  @ApiOperation({
    summary: 'List authenticated user time records',
  })
  @ApiOkResponse({
    description: 'List of authenticated user time records',
    type: TimeRecordResponseDto,
    isArray: true,
  })
  @Get()
  list(@CurrentUser() user: User) {
    return this.timeRecordsService.list(user.id);
  }
}
