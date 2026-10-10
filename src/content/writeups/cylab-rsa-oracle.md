---
title: "RSA Oracle: Chosen Ciphertext Attack"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Medium"
solvedDate: 2026-08-12
tags: ["crypto", "rsa", "oracle", "chosen-ciphertext"]
isPublic: true
author: "AUKA"
summary: "Exploiting an RSA decryption oracle by sending multiplied ciphertexts to circumvent equality checks and recover intercepted secrets."
dossier:
  targetIp: "Remote Oracle Service"
  os: "Linux"
  arch: "x86_64"
  cve: "RSA Chosen Ciphertext Malleability"
  services: ["TCP/Socket Service"]
---

## Phase 1: Intercepted Ciphertexts & Oracle Behavior

An attacker intercepts two encrypted artifacts: `password.enc` and `secret.enc`. The server provides a decryption oracle that will decrypt any ciphertext provided by the user, except the exact intercepted password ciphertext `C_target`.

```bash
# Files available:
ls -la
# password.enc
# secret.enc
```

---

## Phase 2: Homomorphic Malleability Exploitation

Because unpadded textbook RSA is multiplicatively homomorphic:
- `E(m1) * E(m2) = (m1^e) * (m2^e) = (m1 * m2)^e = E(m1 * m2) (mod N)`
We choose a multiplier `m_mult = 2`, encrypt it `c_mult = 2^e (mod N)`, and send `C' = C_target * c_mult (mod N)` to the oracle.
The oracle decrypts `C'` to `2 * password (mod N)`. Dividing by `2` gives the original plaintext password!

```python
#!/usr/bin/env python3
# Chosen Ciphertext Attack on RSA Oracle
from Crypto.Util.number import long_to_bytes

def exploit_oracle(oracle_conn, C_target, e, n):
    # Choose multiplier 2
    c_mult = pow(2, e, n)
    c_prime = (C_target * c_mult) % n

    # Send c_prime to oracle
    decrypted_double = oracle_conn.decrypt(c_prime)

    # Divide by 2
    password_int = decrypted_double // 2
    return long_to_bytes(password_int)
```

---

## Phase 3: Decrypting the Secret Flag

Using the decrypted password, we decrypt `secret.enc` with standard AES or OpenSSL to retrieve the final flag.

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
