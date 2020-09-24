import { URLPolyfill, URLSearchParamsPolyfill } from './polyfill';

export const URL = ((window.URL || URLPolyfill) as unknown) as typeof window.URL;

export const URLSearchParams = ((window.URLSearchParams ||
  URLSearchParamsPolyfill) as unknown) as typeof window.URLSearchParams;
