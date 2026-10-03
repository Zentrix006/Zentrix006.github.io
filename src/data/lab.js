export const labCategories = [
  {
    id: 'autofill',
    label: 'Chrome Autofill',
    description: 'Credential harvesting via browser autofill and password manager behavior.',
    demos: [
      ['Autofill Clickjacking', '/demos/autofill-clickjacking.html'],
      ['Autofill Phishing', '/demos/autofill-phishing.html'],
      ['Credential Fragmentation', '/demos/credential-fragmentation.html'],
      ['Password Manager Overlay', '/demos/password-manager-overlay.html'],
    ],
  },
  {
    id: 'ui-redressing',
    label: 'UI Redressing',
    description: 'Iframe overlays, drag exfiltration, fullscreen deception, and form hijacking.',
    demos: [
      ['Clickjacking', '/demos/clickjacking.html'],
      ['Drag Exfiltration', '/demos/drag-drop-exfiltration.html'],
      ['Fullscreen Phishing', '/demos/fullscreen-phishing.html'],
      ['Form Action Hijack', '/demos/form-action-hijack.html'],
    ],
  },
  {
    id: 'injection-session',
    label: 'Injection & Session',
    description: 'Client-side injection, CSRF, CORS, and tabnabbing demonstrations.',
    demos: [
      ['DOM XSS', '/demos/dom-xss.html'],
      ['Reflected XSS', '/demos/reflected-xss.html'],
      ['CSS Keylogger', '/demos/css-injection-keylogger.html'],
      ['CSRF', '/demos/csrf.html'],
      ['CORS', '/demos/cors-misconfiguration.html'],
      ['Reverse Tabnabbing', '/demos/reverse-tabnabbing.html'],
    ],
  },
  {
    id: 'recon-abuse',
    label: 'Recon & Abuse',
    description: 'Browser fingerprinting and pastejacking abuse patterns.',
    demos: [
      ['Browser Fingerprinting', '/demos/browser-fingerprinting.html'],
      ['Pastejacking', '/demos/paste-jacking.html'],
    ],
  },
]

export const labDemoCount = labCategories.reduce((sum, category) => sum + category.demos.length, 0)
