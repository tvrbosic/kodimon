import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { IHttpError } from '../ts/definitions';

// Configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function useFetchData<Type>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Type | null>(null);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<IHttpError | null>(null);

  const sendRequest = useCallback((path: string) => {
    setIsLoading(true);

    axios
      .get<Type | null>(path)
      .then((request) => setData(request.data))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setIsError(true);
          setError({ status: error.status, message: error.message });
        } else {
          setIsError(true);
          setError({ status: 0, message: 'Unknown error occurred!' });
        }
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
    sendRequest,
  };
}
