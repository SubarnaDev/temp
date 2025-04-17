const res = await fetch('/api/qroq', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: input })
});
const data = await res.json();
responseBox.textContent = data?.response || 'No response received.';
