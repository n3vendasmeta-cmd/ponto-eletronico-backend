import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsOptional, Max, Min } from 'class-validator';

export class TimeRecordFilterDto {
  @ApiPropertyOptional({
    example: '2026-08-01',
    description: 'Data inicial do período',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data inicial deve estar em um formato válido.',
    },
  )
  startDate?: string;

  @ApiPropertyOptional({
    example: '2026-08-31',
    description: 'Data final do período',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data final deve estar em um formato válido.',
    },
  )
  endDate?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Número da página',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'A página deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'A página deve ser maior ou igual a 1.',
  })
  page?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Quantidade de registros por página',
    default: 10,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({
    message: 'O limite deve ser um número inteiro.',
  })
  @Min(1, {
    message: 'O limite deve ser maior ou igual a 1.',
  })
  @Max(100, {
    message: 'O limite deve ser menor ou igual a 100.',
  })
  limit?: number;
}
