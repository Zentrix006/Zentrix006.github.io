window.ZENTRIX_DATA = {
    projects: [
        {
            id: 'apk-threat-detection',
            title: 'APK Threat Detection',
            category: 'Mobile Security Analysis',
            description: 'Android malware analysis and C2 infrastructure detection workflow.',
            problem: 'Suspicious APKs need a fast triage path that connects static indicators with behavior and infrastructure clues.',
            solution: 'Organizes APK analysis around static inspection, behavior review, and threat intelligence signals.',
            technologies: ['Python', 'APK Analysis', 'Malware Analysis', 'Threat Intelligence'],
            github: 'https://github.com/Zentrix006/APK-Threat-Detection',
            status: 'Open-source project',
            visualType: 'apk-analysis',
            flow: ['APK', 'Static Analysis', 'Behavior', 'Threat Intelligence', 'Result']
        },
        {
            id: 'zen-control',
            title: 'Zen Control',
            category: 'Linux System Utility',
            description: 'Linux cooling controller and NitroSense-style tray interface for Acer Nitro laptops.',
            problem: 'Linux users on Acer Nitro hardware need practical fan and thermal control outside vendor Windows tooling.',
            solution: 'Provides a system-control utility focused on laptop cooling and mode management.',
            technologies: ['Python', 'Linux', 'Hardware Control', 'Tray Utility'],
            github: 'https://github.com/Zentrix006/Zen-Control',
            status: 'Open-source project',
            visualType: 'system-control',
            flow: ['Thermals', 'Fan State', 'Mode Control', 'System Feedback']
        },
        {
            id: 'predictive-cyberdefence',
            title: 'Predictive Cyberdefence',
            category: 'Security R&D',
            description: 'Research track for anticipating attack patterns and prioritizing defensive action.',
            problem: 'Defenders need a way to reason from telemetry toward possible attack paths without presenting guesses as certainty.',
            solution: 'Frames telemetry, network state, world-model thinking, forecast, risk, and containment as an explainable research flow.',
            technologies: ['Python', 'Threat Intelligence', 'Risk Scoring', 'Security Research'],
            github: 'https://github.com/Zentrix006?tab=repositories',
            status: 'Active R&D concept',
            visualType: 'prediction-flow',
            flow: ['Telemetry', 'Network State', 'World Model', 'Attack Forecast', 'Risk', 'Defence']
        }
    ],
    skills: [
        {
            id: 'offensive-security',
            label: 'Offensive Security',
            detail: 'Web exploitation, privilege escalation, network pentesting, CTF operations.',
            nodes: ['Web Exploitation', 'Privilege Escalation', 'Network Pentesting', 'CTF']
        },
        {
            id: 'malware-analysis',
            label: 'Malware',
            detail: 'APK triage, malware analysis workflows, C2 infrastructure awareness.',
            nodes: ['APK Security', 'Malware Analysis', 'C2 Analysis', 'Threat Intel']
        },
        {
            id: 'reverse-engineering',
            label: 'Reverse Engineering',
            detail: 'Reverse engineering fundamentals with Ghidra-assisted analysis.',
            nodes: ['Ghidra', 'Static Analysis', 'Binary Reasoning']
        },
        {
            id: 'web-security',
            label: 'Web Security',
            detail: 'Browser security demos covering XSS, CSRF, CORS, clickjacking, and autofill abuse.',
            nodes: ['XSS', 'CSRF', 'CORS', 'Clickjacking', 'Autofill']
        },
        {
            id: 'linux-programming',
            label: 'Linux / Programming',
            detail: 'Python scripting, Linux tooling, shell workflows, JavaScript and HTML demos.',
            nodes: ['Python', 'Linux', 'Shell', 'JavaScript', 'HTML']
        },
        {
            id: 'ai-security',
            label: 'AI / ML Security R&D',
            detail: 'Predictive cyberdefence research framing telemetry, risk, and defensive prioritization.',
            nodes: ['Telemetry', 'Risk Scoring', 'Forecasting', 'Defence Automation']
        }
    ],
    labCategories: [
        {
            id: 'autofill',
            label: 'Chrome Autofill',
            description: 'Credential harvesting via browser autofill and password manager behavior.',
            demos: [
                ['Autofill Clickjacking', 'demos/autofill-clickjacking.html'],
                ['Autofill Phishing', 'demos/autofill-phishing.html'],
                ['Credential Fragmentation', 'demos/credential-fragmentation.html'],
                ['Password Manager Overlay', 'demos/password-manager-overlay.html']
            ]
        },
        {
            id: 'ui-redressing',
            label: 'UI Redressing',
            description: 'Iframe overlays, drag exfiltration, fullscreen deception, and form hijacking.',
            demos: [
                ['Clickjacking', 'demos/clickjacking.html'],
                ['Drag Exfiltration', 'demos/drag-drop-exfiltration.html'],
                ['Fullscreen Phishing', 'demos/fullscreen-phishing.html'],
                ['Form Action Hijack', 'demos/form-action-hijack.html']
            ]
        },
        {
            id: 'injection-session',
            label: 'Injection & Session',
            description: 'Client-side injection, CSRF, CORS, and tabnabbing demonstrations.',
            demos: [
                ['DOM XSS', 'demos/dom-xss.html'],
                ['Reflected XSS', 'demos/reflected-xss.html'],
                ['CSS Keylogger', 'demos/css-injection-keylogger.html'],
                ['CSRF', 'demos/csrf.html'],
                ['CORS', 'demos/cors-misconfiguration.html'],
                ['Reverse Tabnabbing', 'demos/reverse-tabnabbing.html']
            ]
        },
        {
            id: 'recon-abuse',
            label: 'Recon & Abuse',
            description: 'Browser fingerprinting and pastejacking abuse patterns.',
            demos: [
                ['Browser Fingerprinting', 'demos/browser-fingerprinting.html'],
                ['Pastejacking', 'demos/paste-jacking.html']
            ]
        }
    ]
};
