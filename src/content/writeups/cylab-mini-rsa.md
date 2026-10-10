---
title: "Mini RSA: Small Public Exponent Attack (e=3)"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Medium"
solvedDate: 2026-08-10
tags: ["crypto", "rsa", "small-e", "cube-root", "padding"]
isPublic: true
author: "AUKA"
summary: "Attacking RSA with small exponent e=3 where m^e is barely larger than n by calculating integer roots over padded intervals."
dossier:
  targetIp: "Offline Challenge File"
  os: "N/A"
  arch: "N/A"
  cve: "Low Public Exponent RSA (Coppersmith / Root Attack)"
  services: ["Mathematical Analysis"]
---

## Phase 1: Analyzing Public Exponent e=3

When encrypting with RSA where public exponent `e=3` and the message `m` is small, `m^e` may only exceed `N` by a few multiples, meaning `c = m^3 (mod N)` does not wrap around `N` many times.

```bash
# Inspecting provided values:
cat values
# N: [Large 1024-bit modulus]
# e: 3
# ciphertext (c): [Large integer]
```

---

## Phase 2: Unwrapping Modulus Wraparounds (k * N + c)

Since `m^3 = k * N + c` for a relatively small integer `k`, we can iterate through values of `k` starting from `0` and check if `k * N + c` is an exact perfect cube.

```python
#!/usr/bin/env python3
import gmpy2
from Crypto.Util.number import long_to_bytes

# Load parameters from values:
with open("values", "r") as f:
    text = f.read()

# Extract N, e, c:
# For demonstration:
N = ... # from values file
c = ... # from values file
e = 3

print("[*] Searching for integer cube root...")
k = 0
while True:
    val = k * N + c
    root, exact = gmpy2.iroot(val, 3)
    if exact:
        print(f"[+] Found perfect cube at k = {k}!")
        flag = long_to_bytes(int(root))
        print("[+] Flag:", flag)
        break
    k += 1
```

---

## Phase 3: Flag Recovery

Once the root is resolved, converting the resulting integer into ASCII bytes reveals the flag.

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
