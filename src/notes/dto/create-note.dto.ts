import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

import { DetailNote } from '../entities';

export class CreateNoteDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  client: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  total_garments: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  client_pay: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  change: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  missing_pay: number;

  @IsArray({
    each: true,
    always: true,
  })
  @ApiProperty({
    example: [
      {
        id: 0,
        id_g: 0,
        id_n: 0,
        quantity: 0,
        price: 0,
      },
    ],
  })
  details: DetailNote[];
}
