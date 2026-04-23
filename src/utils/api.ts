const DEFAULT_API_URL = 'http://localhost:3000';

const resolveApiBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || '').trim();

  if (!envUrl) {
    return DEFAULT_API_URL;
  }

  const normalized = envUrl.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
    const envPointsToLocal = /localhost|127\.0\.0\.1/i.test(normalized);

    if (!isLocalHost && envPointsToLocal) {
      return DEFAULT_API_URL;
    }
  }

  return normalized;
};

export const API_BASE_URL = resolveApiBaseUrl();