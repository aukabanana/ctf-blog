---
title: "Binary Digits: ASCII Bitstream to Image"
event: "CyLab Academy"
category: "Forensics"
difficulty: "Easy"
solvedDate: 2026-08-18
tags: ["forensics", "binary", "ascii-bits", "cyberchef"]
isPublic: true
author: "AUKA"
summary: "Parsing a raw ASCII bitstream (0s and 1s) from digits.bin and converting it to binary bytes to uncover an image."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "Binary Data Concealment"
  services: ["File & Forensic Analysis"]
---

## Phase 1: Inspecting the Bitstream File

The challenge provides a file `digits.bin`. Opening or running `head` on it reveals that it is not raw binary bytes, but an ASCII text file filled with characters `'0'` and `'1'`.

```bash
# View the initial contents:
head -c 100 digits.bin
# Output: 01001001010001010100111001000111...
```

---

## Phase 2: Binary Parsing & Image Extraction

We convert every 8 characters of `'0'` and `'1'` into a single 8-bit byte to reconstruct the actual underlying file.

```python
#!/usr/bin/env python3
with open("digits.bin", "r") as f:
    bitstring = f.read().replace(" ", "").replace("\n", "").strip()

# Convert bitstring to bytes
byte_array = bytearray()
for i in range(0, len(bitstring), 8):
    byte = bitstring[i:i+8]
    if len(byte) == 8:
        byte_array.append(int(byte, 2))

# Write recovered file
with open("recovered_image.png", "wb") as f:
    f.write(byte_array)

print("[+] Converted bitstream to recovered_image.png")
```

Alternatively in CyberChef, apply the recipe:
- **From Binary** (Byte delimiter: None)
- Render Image

---

## Phase 3: Flag Capture

Opening `recovered_image.png` displays the rendered flag:

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
