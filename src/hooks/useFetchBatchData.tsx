import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { IHttpError } from '../ts/definitions';

// Configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function useFetchBatchData<Type>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Type[] | null>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<IHttpError | null>(null);

  const sendBatchRequest = useCallback((endpoints: string[]) => {
    setIsLoading(true);
    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((response) => {
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
  }, []);

  return {
    isLoading,
    data,
    isError,
    error,
    sendBatchRequest,
  };
}
