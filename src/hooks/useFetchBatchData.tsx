import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { IHttpError } from '../ts/interfaces';

// Configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function useFetchBatchData<Type>(endpoints: string[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Type[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<IHttpError | null>(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
        console.log(response);
        const fetchedData: Type[] = [];
        response.forEach((element) => {
          fetchedData.push(element.data);
        });
        setData(fetchedData);
      })
      .catch((error) => {
        console.error(error);
        setIsError(true);
        setError({ status: 0, message: 'Unknown error occurred!' });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [endpoints]);

  return {
    isLoading,
    data,
    isError,
    error,
  };
}
