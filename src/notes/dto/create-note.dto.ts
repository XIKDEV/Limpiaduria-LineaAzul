import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber } from 'class-validator';

import { DetailNote } from '../entities';

export class CreateNoteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
  })
  client: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 12,
  })
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 2,
  })
  total_garments: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 22,
  })
  client_pay: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10,
  })
  change: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 0,
  })
  missing_pay: number;

  @IsArray({})
  @ApiProperty({
    example: [
      {
        id_g: 2,
        quantity_receive: 1,
        quantity_by_garments: 1,
        price: 12,
      },
    ],
  })
  details: DetailNote[];
}
