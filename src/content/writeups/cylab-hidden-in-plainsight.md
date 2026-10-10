---
title: "Hidden in Plain Sight: Steghide Image Extraction"
event: "CyLab Academy"
category: "Forensics"
difficulty: "Easy"
solvedDate: 2026-08-22
tags: ["forensics", "steganography", "steghide", "exiftool"]
isPublic: true
author: "AUKA"
summary: "Extracting hidden embedded text payload from a JPG image using Steghide."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "Steghide LSB Steganography"
  services: ["Forensic Image Inspection"]
---

## Phase 1: EXIF Metadata & Steganography Analysis

We are given `img.jpg`. Initial metadata inspection with `exiftool` confirms it is a standard JPEG file without obvious abnormal tags.

```bash
# Checking metadata:
exiftool img.jpg
```

---

## Phase 2: Steghide Payload Extraction

We test for embedded data using `steghide`. Prompted for a passphrase, pressing Enter (empty passphrase) successfully extracts the embedded payload:

```bash
# Extract embedded secret:
steghide extract -sf img.jpg -p ""
# Output: wrote extracted data to ".txt".
```

---

## Phase 3: Flag Capture

Inspecting the extracted text file reveals the flag:

```bash
cat .txt
```

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
