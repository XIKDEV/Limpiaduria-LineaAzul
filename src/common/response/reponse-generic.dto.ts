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

  info: any;

  constructor(type?: Function) {
    this.type = type;
  }

  createResponse(
    Success: boolean,
    Message: string,
    Data: T[] = [],
    Info = {}
  ): ResponseGenericDto<T> {
    const resp = new ResponseGenericDto<T>();

    resp.success = Success;
    resp.data = Data;
    resp.message = Message;
    resp.info = Info;
    return resp;
  }
}
