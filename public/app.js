// 🔐 All sensitive logic is server-side

document.getElementById('generateBtn').addEventListener('click', async () => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) // No prompt sent
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error);
    if (!data.candidates || !data.candidates.length)
      throw new Error("No valid candidates returned from Gemini API.");

    const text = data.candidates[0].content.parts[0].text;
    const [usernameLine, passwordLine] = text.split('\n');

    const username = usernameLine?.split(': ')[1]?.trim() || 'N/A';
    const password = passwordLine?.split(': ')[1]?.trim() || 'N/A';

    document.getElementById('username').innerText = username;
    document.getElementById('password').innerText = password;

  } catch (err) {
    console.error("❌ Failed to generate credentials:", err);
    alert("❌ Error: " + err.message);
  }
});

// 📲 PWA install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('installBtn');
  if (installBtn) installBtn.style.display = 'inline-block';
});

document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log("🔔 Install prompt outcome:", outcome);
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
          deferredPrompt = null;
        }
      }
    });
  }
});

// 📋 Copy buttons
document.querySelectorAll('.copyBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const text = document.getElementById(targetId).innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.innerText = '✅';
      setTimeout(() => btn.innerText = '📋', 1500);
    }).catch(() => alert('Copy failed'));
  });
});

// 🔧 Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log("✅ Service Worker registered", reg.scope))
      .catch(err => console.error("❌ SW registration failed", err));
  });
}
