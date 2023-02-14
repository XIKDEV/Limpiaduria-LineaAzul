import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { EGenericResponse } from '../interfaces';

export class ResponseGenericErrorDto<T> {
  @Exclude()
  type: Function;

  @ApiProperty({
    example: false,
  })
  success: boolean;

  @ApiProperty({
    example: [],
  })
  @Type((data) => {
    return data.newObject(new ResponseGenericErrorDto()).type;
  })
  data: T[];

  @ApiProperty({
    example: EGenericResponse.errorMessage,
  })
  message: string;

  constructor(type?: Function) {
    this.type = type;
  }

  createResponse(
    Success: boolean,
    Message: string,
    Data: T[] = []
  ): ResponseGenericErrorDto<T> {
    const resp = new ResponseGenericErrorDto<T>();

    resp.success = Success;
    resp.data = Data;
    resp.message = Message;

    return resp;
  }
}
