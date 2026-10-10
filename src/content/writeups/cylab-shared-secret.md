---
title: "Shared Secrets: Diffie-Hellman Key Exchange Leak"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Easy"
solvedDate: 2026-08-15
tags: ["crypto", "diffie-hellman", "discrete-log", "xor"]
isPublic: true
author: "AUKA"
summary: "Reconstructing a Diffie-Hellman shared key when one of the private exponents was leaked in the message exchange."
dossier:
  targetIp: "Offline Challenge Files"
  os: "N/A"
  arch: "N/A"
  cve: "Diffie-Hellman Private Exponent Leak"
  services: ["Python Script Analysis"]
---

## Phase 1: Inspecting the Leaked Exchange

In the challenge files `encryption.py` and `message.txt`, we find the Diffie-Hellman parameters:
- Generator `g = 2`
- Large prime modulus `p` (1048-bit)
- Alice's public value `A = pow(g, a, p)`
- Bob's private secret exponent `b` (inadvertently leaked in `message.txt`!)
- Ciphertext `enc`

```bash
# Check message contents:
cat message.txt
# Contains g, p, A, b, and enc_hex
```

---

## Phase 2: Computing the Shared Key

Since we have Alice's public key `A`, Bob's private exponent `b`, and modulus `p`, the Diffie-Hellman shared secret is directly computable without breaking discrete logarithm:
- `shared = pow(A, b, p)`
- Key byte for XOR encryption is `shared % 256`

```python
#!/usr/bin/env python3
g = 2
p = 2132004026303109138960419370582104845382939159231816273620696701294630284403386465532863373769144582236949856392667504369986764250039517010152815931140874682590496582913679422125500008296870534246366594745735993256988714723377030293374496770744770410547817411606458596058022709758993968788819254528632650187419776389
A = 1141933368749651547285106584770022946598556294532255484018234071279017284493261458304303078441814350280055235938839850330392924394827971935746684756724106154783529866206686364342391780819577389806835022154187096665229978275413748714049243740736779489018438278478708068573511338451873371736513057724525994219285563327
b = 738623211561746372624170944030870485944978187433844583412325760777341380867104112487743286812112394661187612902430214202202766378016375904891604068375412515990443266634874912487423407082997026224391496763715710675145163967715339675283689424507137408425143581496186446869723885557865390662886201409684909929549168034
enc_hex = "928b818da1b6a499868abd91d18190d196bdd1d08781d0d4d5db9f"

enc = bytes.fromhex(enc_hex)

# Calculate shared key:
shared = pow(A, b, p)

# Decrypt XOR stream:
flag = bytes([x ^ (shared % 256) for x in enc])
print("[+] Decrypted Flag:", flag.decode('utf-8'))
```

---

## Phase 3: Flag Verification

Running the script reveals the recovered flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
