import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGarmentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1.2,
  })
  code_garment: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Falda',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
  })
  number_garments: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 100.5,
  })
  price: number;
}
