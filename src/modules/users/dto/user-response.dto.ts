import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '1' })
  id!: string;

  @ApiProperty({ example: 'Fulano de Tal' })
  name!: string;

  @ApiProperty({ example: 'usuario@empresa.com' })
  email!: string;

  @ApiProperty({ example: 'EMPLOYEE' })
  role!: string;

  @ApiProperty({ example: true })
  active!: boolean;

  @ApiProperty({ example: '2026-07-07T12:42:32.450Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-07-07T12:42:32.450Z' })
  updatedAt!: Date;
}
