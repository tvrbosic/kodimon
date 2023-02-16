export interface IHttpError {
  status: number | undefined;
  message: string;
}

export interface IUseFetchData<Type> {
  isLoading: boolean;
  data: Type | null;
  isError: boolean;
  error: IHttpError | null;
}
