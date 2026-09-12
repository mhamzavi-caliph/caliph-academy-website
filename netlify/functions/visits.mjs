import { getStore } from '@netlify/blobs';

// Site-owned visitor counter, backed by Netlify Blobs.
// GET  /api/visits         -> { value } (read only)
// GET  /api/visits?hit=1    -> increment, then { value }
export default async (req) => {
  const store = getStore('counter');
  const KEY = 'site-visits';
  const params = new URL(req.url).searchParams;
  const hit = params.get('hit') === '1';

  // one-time reset (temporary, removed after launch baseline set)
  if (params.get('reset') === 'd2afe89a25b154fe1ad022e8fcb96e92') {
    await store.set(KEY, '0');
    return new Response(JSON.stringify({ value: 0, reset: true }), {
      headers: { 'content-type': 'application/json', 'cache-control': 'no-store' }
    });
  }

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
