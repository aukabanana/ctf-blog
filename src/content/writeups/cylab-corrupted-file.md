---
title: "Corrupted File: Restoring JPEG Magic Bytes"
event: "CyLab Academy"
category: "Forensics"
difficulty: "Easy"
solvedDate: 2026-08-18
tags: ["forensics", "file-signatures", "magic-bytes", "jpeg-repair"]
isPublic: true
author: "AUKA"
summary: "Inspecting broken file headers with xxd and restoring corrupt JPEG magic bytes (FF D8 FF E0) to render the flag image."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "Corrupted File Header"
  services: ["Binary Carving & Header Repair"]
---

## Phase 1: Hexdump Inspection & Signature Analysis

We are given a file named `file` which fails to open in image viewers. Inspecting the first few bytes with `xxd` reveals that the header magic bytes have been modified or zeroed out:

```bash
# Inspecting file header:
xxd file | head -n 5

# Notice corrupt first 4 bytes, while the remaining structure contains standard JPEG markers (JFIF/Exif).
```

---

## Phase 2: Repairing the JPEG Header with Python

A standard JPEG image begins with the 4-byte signature `FF D8 FF E0` (or `FF D8 FF E1` for Exif). We replace the corrupt first 4 bytes with `ÿØÿà` to restore header integrity.

```python
#!/usr/bin/env python3
with open('file', 'rb') as f:
    data = f.read()

# Replace corrupt first 4 bytes with standard JPEG SOI and APP0 markers:
with open('fixed_img.jpg', 'wb') as f:
    f.write(b'\xff\xd8\xff\xe0' + data[4:])

print("[+] File header restored successfully as fixed_img.jpg")
```

---

## Phase 3: Viewing Restored Image & Flag Capture

Opening `fixed_img.jpg` displays the valid image containing the flag text.

```bash
# Open image:
xdg-open fixed_img.jpg # or eog fixed_img.jpg
```

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
