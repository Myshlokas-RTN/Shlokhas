
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    if (toggleSwitch) toggleSwitch.checked = true;
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', function (e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, false);
}

const settingsBtn = document.getElementById('settings-btn');
const settingsDropdown = document.getElementById('settings-dropdown');

if (settingsBtn && settingsDropdown) {
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        settingsDropdown.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
            settingsDropdown.classList.remove('active');
        }
    });
}


// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Note: the path must be relative to the root for GitHub pages or any subpath hosting.
    // For this simple setup, assuming '/sw.js' works or we use a clever root-relative trick.
    // We will assume 'sw.js' is in the root and figure out the path dynamically if needed.
    // To be safe and framework-agnostic, grab base from URL if necessary.
    
    let swPath = '/sw.js';
    // Let's use an absolute path calculation based on current location to support github pages like /repository-name/
    const loc = window.location.pathname;
    let rootPath = '/';
    if(loc.includes('/rama/')) {
        rootPath = '../';
    } 
    // In GitHub pages, it's safer to register with the scope of the repo
    const swUrl = new URL('sw.js', window.location.href.split('/rama/')[0] + '/').href;

    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
