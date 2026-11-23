import { useState, type ImgHTMLAttributes } from 'react';

const fallbackImage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420"><rect width="640" height="420" fill="#e8eee8"/><rect x="250" y="130" width="140" height="112" rx="18" fill="#d4e2d7"/><circle cx="292" cy="166" r="13" fill="#8ba895"/><path d="m264 222 42-43 31 30 20-20 19 33H264Z" fill="#6e917a"/><path d="M190 292h260" stroke="#b2c5b6" stroke-width="8" stroke-linecap="round"/></svg>')}`;

export function ImageWithFallback({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = src ?? '';
  const hasError = failedSource === source;

  return <img {...props} src={hasError ? fallbackImage : source} alt={alt} onError={() => setFailedSource(source)} />;
}