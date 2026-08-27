import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { TimeRecordFilterDto } from './dto/time-record-filter.dto';
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
  @ApiBadRequestResponse({
    description:
      'Aguarde pelo menos 1 minuto antes de registrar um novo ponto.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
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
  @ApiBadRequestResponse({
    description: 'Data inicial ou final em formato inválido.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @Get()
  list(@CurrentUser() user: User, @Query() filter: TimeRecordFilterDto) {
    return this.timeRecordsService.list(user.id, filter);
  }
}
