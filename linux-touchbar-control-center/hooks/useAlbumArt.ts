import { useEffect, useState, useMemo } from 'react';
import { resolveArt, getYoutubeThumbnailUrl, cache } from '../services/albumArtResolver';

/** Returns a `data:` URI for the given art URL, or null while loading / on failure. */
export function useAlbumArt(url: string | undefined, videoUrl?: string | undefined): string | null {
  // Attempt instant synchronous cache resolution
  const initialUri = useMemo(() => {
    if (url) {
      if (url.startsWith('data:')) return url;
      const cached = cache.get(url);
      if (cached) return cached;
    }
    const ytThumb = getYoutubeThumbnailUrl(videoUrl);
    if (ytThumb) {
      const cached = cache.get(ytThumb);
      if (cached) return cached;
    }
    return null;
  }, [url, videoUrl]);

  const [uri, setUri] = useState<string | null>(initialUri);

  useEffect(() => {
    if (initialUri) {
      setUri(initialUri);
      return;
    }
    if (!url && !videoUrl) {
      setUri(null);
      return;
    }
    
    let alive = true;
    resolveArt(url, videoUrl)
      .then(u => { if (alive) setUri(u); })
      .catch(err => {
        console.error('[useAlbumArt] failed to resolve art URL:', url || videoUrl, err instanceof Error ? err.message : err);
        if (alive) setUri(null);
      });
    return () => { alive = false; };
  }, [url, videoUrl, initialUri]);

  return uri;
}
