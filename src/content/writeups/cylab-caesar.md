---
title: "Caesar Cipher: Crossing the Rubicon"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Medium"
solvedDate: 2026-08-05
tags: ["cryptography", "caesar-cipher", "rot", "classical"]
isPublic: true
author: "AUKA"
summary: "Decrypting a classic Caesar rotation ciphertext from data.enc by calculating the alphabet shift offset."
dossier:
  targetIp: "Offline Challenge File"
  os: "Any"
  arch: "N/A"
  cve: "Insecure Classical Cryptosystem"
  services: ["File Analysis"]
---

## Phase 1: Inspecting Ciphertext Artifacts

We are provided with an encrypted artifact `data.enc`. Inspecting the file contents reveals a single line of rotated alphabetical characters.

```bash
# View the encrypted text:
cat data.enc

# Sample content:
# fshtDWT{...}
```

---

## Phase 2: Frequency Analysis & Caesar Shift Decryption

Since standard CTF flags begin with the known prefix `picoCTF{`, we can easily calculate the shift offset:
- The distance between ciphertext prefix letters and `picoCTF` provides the exact key `k`.
- We can decrypt with a Python one-liner or CyberChef.

```python
#!/usr/bin/env python3
def decrypt_caesar(ciphertext, shift):
    result = []
    for char in ciphertext:
        if 'a' <= char <= 'z':
            result.append(chr((ord(char) - ord('a') - shift) % 26 + ord('a')))
        elif 'A' <= char <= 'Z':
            result.append(chr((ord(char) - ord('A') - shift) % 26 + ord('A')))
        else:
            result.append(char)
    return "".join(result)

with open("data.enc", "r") as f:
    enc = f.read().strip()

# Testing shifts:
for s in range(26):
    candidate = decrypt_caesar(enc, s)
    if "picoCTF{" in candidate:
        print(f"[+] Found key shift {s}: {candidate}")
        break
```

---

## Phase 3: Flag Recovery

Decryption reveals the readable flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
