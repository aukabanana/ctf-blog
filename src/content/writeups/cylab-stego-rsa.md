---
title: "StegoRSA: Private Key Hidden in Image EXIF Metadata"
event: "CyLab Academy"
category: "Crypto"
difficulty: "Easy"
solvedDate: 2026-08-16
tags: ["crypto", "forensics", "steganography", "rsa", "exiftool"]
isPublic: true
author: "AUKA"
summary: "Extracting an RSA private key concealed as hex-encoded text in an image's EXIF metadata to decrypt an encrypted flag file."
dossier:
  targetIp: "Offline Challenge Files"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "Steganographic Key Concealment"
  services: ["Forensic Image & Cryptographic Analysis"]
---

## Phase 1: EXIF Metadata Analysis

We are given two challenge files: `flag.enc` and `image.jpg`. Running `exiftool` on `image.jpg` reveals a suspicious hex-encoded string stored inside one of the image's metadata fields.

```bash
# Inspect image metadata:
exiftool image.jpg

# A large hexadecimal string starting with 2d2d2d2d2d424547494e... is discovered.
```

---

## Phase 2: Decoding the RSA Private Key

Decoding the hexadecimal string reveals a PEM-formatted RSA private key (`-----BEGIN PRIVATE KEY-----`).

```bash
# Convert hex string to PEM key:
echo "2d2d2d2d2d424547494e..." | xxd -r -p > private.key

# Verify key format:
openssl rsa -in private.key -check
```

---

## Phase 3: Decrypting the Flag with OpenSSL

With the valid RSA private key in hand, we decrypt `flag.enc` using `openssl pkeyutl`.

```bash
# Decrypt ciphertext:
openssl pkeyutl -decrypt -inkey private.key -in flag.enc -out flag.txt

# Read flag:
cat flag.txt
```

---

## Phase 4: Flag Verification

The recovered plaintext matches the target flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
