---
title: "Interencdec: Multi-Layer Encoding & Substitution"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Easy"
solvedDate: 2026-08-05
tags: ["cryptography", "base64", "caesar-cipher", "encoding"]
isPublic: true
author: "AUKA"
summary: "Peeling through nested encoding layers: Base64 decoding followed by a Caesar cipher substitution to extract the flag."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "Multi-layered Obfuscation"
  services: ["File Analysis"]
---

## Phase 1: Reconnaissance & First-Stage Base64 Decoding

Examining the file `enc_flag` reveals an encoded ASCII string with Base64 characteristics.

```bash
# Inspect the raw file:
cat enc_flag

# Decode first Base64 layer:
cat enc_flag | base64 -d
```

---

## Phase 2: Secondary Decoding & Caesar Cipher Shift

The output of the first stage yields another encoded or shifted string. Inspecting the structure reveals a second layer of Base64 wrapping a Caesar-shifted flag payload.

```bash
# Chaining base64 decode and rot13/caesar rotation:
cat enc_flag | base64 -d | base64 -d
# Output: wpjpHUM{...} (Caesar cipher shifted)
```

```python
#!/usr/bin/env python3
import base64

with open("enc_flag", "r") as f:
    data = f.read().strip()

# Decode nested base64
decoded = base64.b64decode(data).decode('utf-8')
# Second layer decode if needed
if "b'" in decoded or "=" in decoded:
    inner = base64.b64decode(decoded).decode('utf-8')
else:
    inner = decoded

print("[*] Intermediate text:", inner)

# Caesar shift decryption:
def shift(s, n):
    return "".join(chr((ord(c) - 97 - n) % 26 + 97) if c.islower() else (chr((ord(c) - 65 - n) % 26 + 65) if c.isupper() else c) for c in s)

for k in range(26):
    res = shift(inner, k)
    if "picoCTF{" in res:
        print(f"[+] Recovered Flag (shift={k}): {res}")
```

---

## Phase 3: Flag Extraction

The final Caesar decryption layer reveals the flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
