import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { TimeRecordsService } from './time-records.service';

@ApiTags('Time Records')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('time-records')
export class TimeRecordsController {
  constructor(private readonly timeRecordsService: TimeRecordsService) {}

  @Post('register')
  register(@CurrentUser() user: User) {
    return this.timeRecordsService.register(user.id);
  }
}
