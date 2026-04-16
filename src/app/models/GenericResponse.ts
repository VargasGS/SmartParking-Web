export interface GenericResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: any;
  response: any;
}