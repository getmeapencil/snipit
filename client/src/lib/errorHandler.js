import { AxiosError } from "axios";

export const handleError = (error, options) => {
  const { contextPrefix, rethrow = true, logLevel = "error" } = options;

  if (error instanceof AxiosError) {
    // Get detailed axios error information
    const statusCode = error.response?.status;
    const responseData = error.response?.data;
    const requestUrl = `${error.config?.baseURL}${error.config?.url}`;

    console[logLevel](`${contextPrefix}:`, {
      statusCode,
      responseData,
      requestUrl,
    });
  } else {
    // Handle non-axios errors
    console[logLevel](`${contextPrefix}:`, error);
  }

  if (rethrow) {
    throw error;
  }

  return undefined;
};
