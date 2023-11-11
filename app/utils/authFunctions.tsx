import { useEffect } from 'react';

export const useAutoClearMessage = (
  message: string | null,
  clearMessage: () => void
) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, clearMessage]);
};

export function extractErrorMessage(response: unknown): string | null {
  const errorMessagePattern = /"message":"(.*?)"/;
  const match = errorMessagePattern.exec(JSON.stringify(response));
  return match ? match[1] : null;
}
