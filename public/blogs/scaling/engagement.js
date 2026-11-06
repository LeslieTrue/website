(() => {
  const root = document.querySelector('[data-article-stats]');
  if (!root) return;
  const endpoint = 'https://tianzhe-scaling-counter.ami-labs-7159.chatgpt.site/api/counts';
  // Both language routes deliberately share these keys and the same endpoint.
  const prefix = 'scaling-engagement-v1:';
  const zh = document.documentElement.lang.startsWith('zh');
  const labels = zh
    ? { like: '点赞', liked: '已点赞', retry: '点赞未成功，请重试。', unavailable: '计数暂时不可用', saved: '暂时显示上次的计数', title: '中英文共享计数；同一浏览器半小时内浏览计一次，点赞计一次。' }
    : { like: 'Like', liked: 'Liked', retry: 'Could not save your like. Please retry.', unavailable: 'Counts temporarily unavailable', saved: 'Showing saved counts for now', title: 'Shared across languages. One view per browser every 30 minutes; one like per browser.' };
  const read = (key) => { try { return localStorage.getItem(prefix + key); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(prefix + key, value); } catch { /* Storage may be disabled; the current page still works. */ } };
  const button = root.querySelector('[data-like-button]');
  const status = root.querySelector('[data-stats-status]');
  let liked = read('liked') === 'true';
  let busy = false;
  const visitor = read('visitor') || crypto.randomUUID();
  write('visitor', visitor);
  let view;
  try { view = JSON.parse(read('view')); } catch { /* Start a fresh visit. */ }
  if (!view || typeof view.id !== 'string' || !(view.expires > Date.now())) {
    view = { id: crypto.randomUUID(), expires: Date.now() + 30 * 60 * 1000 };
    write('view', JSON.stringify(view));
  }
  const totals = { views: -1, likes: -1 };
  const validCounts = (data) => data && ['views', 'likes'].every(key => Number.isSafeInteger(data[key]) && data[key] >= 0);
  const paint = (data) => {
    if (!validCounts(data)) throw new Error('Invalid count');
    for (const [key, selector] of [['views', '[data-view-count]'], ['likes', '[data-like-count]']]) {
      totals[key] = Math.max(totals[key], data[key]);
      root.querySelector(selector).textContent = totals[key].toLocaleString(zh ? 'zh-CN' : 'en-US');
    }
  };
  const state = () => {
    button.disabled = busy || liked;
    button.setAttribute('aria-pressed', String(liked));
    button.setAttribute('aria-busy', String(busy));
    root.querySelector('[data-like-label]').textContent = liked ? labels.liked : labels.like;
  };
  async function request(event) {
    const response = await fetch(endpoint, {
      method: event ? 'POST' : 'GET',
      ...(event ? { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(event) } : {}),
      credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
      signal: AbortSignal.timeout(event ? 8000 : 6000),
    });
    if (!response.ok) throw new Error('Counter request failed');
    const data = await response.json();
    paint(data);
    write('counts', JSON.stringify({ ...totals, savedAt: Date.now() }));
  }
  root.hidden = false;
  root.title = labels.title;
  state();
  // Render the last confirmed totals immediately, including when switching languages.
  try {
    const saved = JSON.parse(read('counts'));
    const age = Date.now() - saved?.savedAt;
    if (validCounts(saved) && age >= 0 && age < 24 * 60 * 60 * 1000) paint(saved);
  } catch { /* A missing or damaged cache never blocks live counts. */ }

  // A read must not wait behind the write's CORS preflight or database insert.
  const loading = [request()];
  if (!view.recorded) {
    loading.push(request({ kind: 'view', visitor: view.id }).then(() => {
      // Do not replace a newer session created in another tab while we waited.
      let current;
      try { current = JSON.parse(read('view')); } catch { return; }
      if (current?.id === view.id) write('view', JSON.stringify({ ...current, recorded: true }));
    }));
  }
  Promise.allSettled(loading).then(results => {
    if (results.every(result => result.status === 'rejected') && !status.textContent) {
      status.textContent = totals.views >= 0 ? labels.saved : labels.unavailable;
    }
  });
  button.addEventListener('click', async () => {
    if (busy || liked) return;
    busy = true; state(); status.textContent = '';
    try {
      await request({ kind: 'like', visitor });
      liked = true;
      write('liked', 'true');
    } catch { status.textContent = labels.retry; }
    finally { busy = false; state(); }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === prefix + 'liked') {
      liked = event.newValue === 'true'; state(); request().catch(() => {});
    }
  });
})();
