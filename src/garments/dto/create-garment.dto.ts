import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGarmentDto {
  @IsNumber()
  @IsNotEmpty()
  code_garment: number

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  number_garments: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

}
