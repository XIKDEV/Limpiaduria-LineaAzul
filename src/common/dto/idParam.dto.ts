import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IdParamDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
