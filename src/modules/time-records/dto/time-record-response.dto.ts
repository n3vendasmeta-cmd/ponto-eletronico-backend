import { ApiProperty } from '@nestjs/swagger';

export class TimeRecordResponseDto {
  @ApiProperty({
    example: '1',
    description: 'Unique identifier of the time record',
  })
  id: string;

  @ApiProperty({
    example: 'CLOCK_IN',
    description: 'Time record type',
  })
  type: string;

  @ApiProperty({
    example: '2026-07-30T13:45:22.000Z',
    description: 'Date and time of the time record',
  })
  recordedAt: Date;

  @ApiProperty({
    example: 'WEB',
    description: 'Source that created the time record',
  })
  source: string;

  @ApiProperty({
    example: null,
    description: 'Optional notes about the time record',
    nullable: true,
  })
  notes: string | null;
}
