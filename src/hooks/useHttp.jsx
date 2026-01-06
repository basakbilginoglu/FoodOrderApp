import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || 'Request failed!');
  }

  return resData;
}

export default function useHttp(url, config, initialData = null) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(null);

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: data,
        });
        setData(resData);
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    // Only auto-send for GET requests (or when method is not specified/null)
    if (
      (config?.method === 'GET' || !config?.method) &&
      url
    ) {
      sendRequest();
    }
  }, [sendRequest, config?.method, url]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}