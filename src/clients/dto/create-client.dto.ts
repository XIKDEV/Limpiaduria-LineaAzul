import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: 'Anahi',
    required: true,
  })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    default: 'anahi@gmail.com',
  })
  email: string;

  @ApiPropertyOptional({
    default: '1234566786',
  })
  @IsOptional()
  @IsString()
  cellphone: string;
}
