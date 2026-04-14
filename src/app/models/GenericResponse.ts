export interface GenericResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}