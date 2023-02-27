import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class ResponseGenericDto<T> {
  @Exclude()
  type: Function;

  @ApiProperty()
  success: boolean;

  @ApiProperty({
    example: [],
  })
  @Type((data) => {
    return data.newObject(new ResponseGenericDto()).type;
  })
  data: T[];

  @ApiProperty()
  message: string;

  constructor(type?: Function) {
    this.type = type;
  }

  createResponse(
    Success: boolean,
    Message: string,
    Data: T[] = []
  ): ResponseGenericDto<T> {
    const resp = new ResponseGenericDto<T>();

    resp.success = Success;
    resp.data = Data;
    resp.message = Message;

    return resp;
  }
}
