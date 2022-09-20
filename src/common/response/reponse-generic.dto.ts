import { Exclude, Type } from 'class-transformer';

export class ResponseGenericDto<T> {
  @Exclude()
  type: Function;

  success: boolean;

  @Type((data) => {
    return data.newObject(new ResponseGenericDto()).type;
  })
  data: T[];

  message: string;

  constructor(type?: Function) {
    this.type = type;
  }

  createResponse(
    Success: boolean,
    Message: string,
    Data: T[] = [],
  ): ResponseGenericDto<T> {
    const resp = new ResponseGenericDto<T>();

    resp.success = Success;
    resp.message = Message;
    resp.data = Data;

    return resp;
  }
}
