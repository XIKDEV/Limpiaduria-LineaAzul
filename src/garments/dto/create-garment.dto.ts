import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGarmentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  code_garment: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  number_garments: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
