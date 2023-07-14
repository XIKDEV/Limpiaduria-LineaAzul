import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class queryParamsDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  page: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  rows: string;
}
