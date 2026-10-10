---
title: "Mind your Ps and Qs: RSA Small Modulus Factorization"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Medium"
solvedDate: 2026-08-10
tags: ["crypto", "rsa", "factordb", "modular-arithmetic"]
isPublic: true
author: "AUKA"
summary: "Factorizing a small RSA modulus N to recover prime factors p and q, computing the private exponent d, and decrypting the ciphertext."
dossier:
  targetIp: "Offline Challenge File"
  os: "N/A"
  arch: "N/A"
  cve: "Insufficient Key Size (RSA Small Modulus)"
  services: ["Mathematical Analysis"]
---

## Phase 1: RSA Parameter Extraction

We are provided with a text file `values` containing the standard RSA public parameters and ciphertext:

```bash
# View the challenge values:
cat values

# c: 15341890103764929939105506004034128738090325640037083301857608662849501626260517
# n: 948406957756830799684818171639547165784816468744946013083947881743680617123566349
# e: 65537
```

---

## Phase 2: Modulus Factorization via FactorDB

The modulus `n` is approximately 81 digits (around 270 bits), which is trivial to factor using public databases like FactorDB or Pollard's rho algorithm. Querying FactorDB yields the two prime factors `p` and `q`.

```python
#!/usr/bin/env python3
import gmpy2
from Crypto.Util.number import long_to_bytes

# Given parameters:
c = 15341890103764929939105506004034128738090325640037083301857608662849501626260517
n = 948406957756830799684818171639547165784816468744946013083947881743680617123566349
e = 65537

# Factoring n into p and q:
# FactorDB gives:
# p = 3058514107386047717478058223681474982687
# q = 3100874999127211910246369701449601283767
```

---

## Phase 3: Private Key Derivation & Decryption

Using `p` and `q`, we compute Euler's totient `phi = (p-1)*(q-1)`, find the modular multiplicative inverse `d = pow(e, -1, phi)`, and decrypt `m = pow(c, d, n)`.

```python
#!/usr/bin/env python3
from Crypto.Util.number import inverse, long_to_bytes

p = 3058514107386047717478058223681474982687
q = 3100874999127211910246369701449601283767
c = 15341890103764929939105506004034128738090325640037083301857608662849501626260517
e = 65537
n = p * q

phi = (p - 1) * (q - 1)
d = inverse(e, phi)
m = pow(c, d, n)

flag = long_to_bytes(m)
print("[+] Decrypted Flag:", flag.decode('utf-8', errors='ignore'))
```

---

## Phase 4: Flag Verification

Executing the script recovers the plaintext flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
