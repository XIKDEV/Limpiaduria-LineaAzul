export enum EGenericResponse {
  found = 'Information found',
  create = 'New register created',
  update = 'Register updated',
  delete = 'Register deleted',
  serverError = 'Server Error',
  conflictError = "Can be an error with data or can't found the register",
  unprocessableEntity = 'Error with body request',
  newFolio = 'New folio',
  noteDelivery = 'Note was delivery',
  noteCancel = 'Note was cancel',
  countFinish = 'Count finished',
  notGarmentDelivery = 'Not Garment delivery this day',
}
