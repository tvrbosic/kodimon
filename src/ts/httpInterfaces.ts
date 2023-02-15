export interface IFetchDataProps {
  path: string;
}

export interface IHttpError {
  status: number | undefined;
  message: string;
}
