import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'usuario@empresa.com',
    description: 'E-mail utilizado para autenticação.',
    format: 'email',
  })
  @IsEmail()
  @MaxLength(180)
  email!: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha de acesso do usuário.',
    minLength: 6,
    maxLength: 100,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
}