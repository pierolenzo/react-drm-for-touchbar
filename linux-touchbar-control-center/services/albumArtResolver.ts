import { readFile } from 'fs/promises';

export const cache = new Map<string, string>();

function mimeFromExt(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase();
  if (ext === 'png')  return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif')  return 'image/gif';
  return 'image/jpeg';
}

export function getYoutubeThumbnailUrl(url: string | undefined): string | null {
  if (!url) return null;
  let videoId: string | null = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1);
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.slice('/embed/'.length);
      } else {
        videoId = parsed.searchParams.get('v');
      }
    }
  } catch {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (match) videoId = match[1];
  }
  if (videoId && videoId.length === 11) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

export async function resolveArt(url: string | undefined, videoUrl: string | undefined): Promise<string> {
  if (url) {
    const hit = cache.get(url);
    if (hit) return hit;

    try {
      let targetUrl = url;
      if (targetUrl.startsWith('https://open.spotify.com/image/')) {
        targetUrl = targetUrl.replace('https://open.spotify.com/image/', 'https://i.scdn.co/image/');
      } else if (targetUrl.startsWith('http://open.spotify.com/image/')) {
        targetUrl = targetUrl.replace('http://open.spotify.com/image/', 'https://i.scdn.co/image/');
      }

      let dataUri: string;
      if (targetUrl.startsWith('data:')) {
        dataUri = targetUrl;
      } else if (targetUrl.startsWith('file://') || targetUrl.startsWith('/')) {
        const path = targetUrl.startsWith('file://') ? decodeURIComponent(targetUrl.slice('file://'.length)) : targetUrl;
        const buf  = await readFile(path);
        dataUri = `data:${mimeFromExt(path)};base64,${buf.toString('base64')}`;
      } else {
        const res = await fetch(targetUrl);
        if (!res.ok) throw new Error(`art fetch ${res.status}`);
        const mime = res.headers.get('content-type')?.split(';')[0] || 'image/jpeg';
        const buf  = Buffer.from(await res.arrayBuffer());
        dataUri = `data:${mime};base64,${buf.toString('base64')}`;
      }

      cache.set(url, dataUri);
      return dataUri;
    } catch (err) {
      console.warn('[resolveArt] Primary art resolution failed:', url, err instanceof Error ? err.message : err);
    }
  }

  const ytThumb = getYoutubeThumbnailUrl(videoUrl);
  if (ytThumb) {
    const hit = cache.get(ytThumb);
    if (hit) return hit;

    try {
      const res = await fetch(ytThumb);
      if (!res.ok) throw new Error(`youtube thumb fetch ${res.status}`);
      const mime = res.headers.get('content-type')?.split(';')[0] || 'image/jpeg';
      const buf  = Buffer.from(await res.arrayBuffer());
      const dataUri = `data:${mime};base64,${buf.toString('base64')}`;
      
      cache.set(ytThumb, dataUri);
      return dataUri;
    } catch (err) {
      console.warn('[resolveArt] YouTube thumbnail resolution failed:', ytThumb, err instanceof Error ? err.message : err);
    }
  }

  throw new Error('No art URL or fallback thumbnail could be resolved');
}
