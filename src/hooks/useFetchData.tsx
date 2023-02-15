import { useEffect, useState } from 'react';
import axios from 'axios';

import { IHttpError } from '../ts/httpInterfaces';

// Configuration
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const useFetchData = (path: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState<IHttpError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(path);
        setData(response);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.status);
          console.error(error.response);
          setError({ status: error.status, message: error.message });
        } else {
          setError({ status: 0, message: 'Unknown error occurred!' });
          console.error(error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [path]);

  return {
    isLoading,
    data,
    error,
  };
};
