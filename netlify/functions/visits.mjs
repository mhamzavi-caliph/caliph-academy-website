import { getStore } from '@netlify/blobs';

// Site-owned visitor counter, backed by Netlify Blobs.
// GET  /api/visits         -> { value } (read only)
// GET  /api/visits?hit=1    -> increment, then { value }
export default async (req) => {
  const store = getStore('counter');
  const KEY = 'site-visits';
  const hit = new URL(req.url).searchParams.get('hit') === '1';

  // strong consistency so each increment reads the freshest value first
  let n = parseInt((await store.get(KEY, { consistency: 'strong' })) || '0', 10);
  if (!Number.isFinite(n)) n = 0;

  if (hit) {
    n += 1;
    await store.set(KEY, String(n));
  }

  return new Response(JSON.stringify({ value: n }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*'
    }
  });
};
