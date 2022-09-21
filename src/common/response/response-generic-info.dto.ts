import { Exclude, Type } from 'class-transformer';

export class ResponseGenericInfoDto<T> {
  @Exclude()
  type: Function;

  success: boolean;

  @Type((data) => {
    return data.newObject(new ResponseGenericInfoDto()).type;
  })
  data: T;

  message: string;

  constructor(type?: Function) {
    this.type = type;
  }

  createResponse(
    Success: boolean,
    Message: string,
    Data: T,
  ): ResponseGenericInfoDto<T> {
    const resp = new ResponseGenericInfoDto<T>();

    resp.success = Success;
    resp.data = Data;
    resp.message = Message;

    return resp;
  }
}
