---
title: "Flag in Flame: Base64 Log Carving & OCR Extraction"
event: "CyLab Academy"
category: "Forensics"
difficulty: "Easy"
solvedDate: 2026-08-20
tags: ["forensics", "base64", "ocr", "tesseract", "hexdump"]
isPublic: true
author: "AUKA"
summary: "Carving a massive Base64-encoded PNG image concealed within system logs and decoding an embedded hex string using OCR."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux"
  arch: "x86_64"
  cve: "Log File Steganography"
  services: ["Log Analysis & OCR"]
---

## Phase 1: Log Inspection & Payload Carving

A huge log file `logs.txt` was flagged by a SOC team. Reviewing the contents reveals that normal log events end abruptly and are replaced by a massive continuous Base64 payload block.

```bash
# Inspect log structure:
head -n 20 logs.txt
tail -n 20 logs.txt

# Base64 decode the embedded blob into an image file:
base64 -d logs.txt > logs.png
```

---

## Phase 2: OCR Text Recognition with Tesseract

The decoded image `logs.png` displays graphical text containing a hexadecimal string. To extract it accurately without manual transcription error, we use Tesseract OCR:

```bash
# Run OCR on the decoded image:
tesseract logs.png ocr_output -l eng

# View the extracted hex string:
cat ocr_output.txt
```

---

## Phase 3: Hex Decoding & Flag Recovery

Converting the discovered hex string back to ASCII characters produces the challenge flag:

```bash
# Convert hex to raw ASCII:
echo -n "7069636f4354467b666f72656e736963735f616e616c797369735f69735f616d617a696e675f62396163346362397d" | xxd -r -p
```

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
