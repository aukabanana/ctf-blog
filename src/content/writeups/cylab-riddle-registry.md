---
title: "Riddle Registry: PDF Metadata Forensics"
event: "CyLab Academy"
category: "Forensics"
difficulty: "Easy"
solvedDate: 2026-08-22
tags: ["forensics", "pdf", "metadata", "exiftool"]
isPublic: true
author: "AUKA"
summary: "Uncovering a hidden CTF flag embedded within the metadata properties of a suspicious PDF document."
dossier:
  targetIp: "Offline Challenge File"
  os: "Linux / Windows"
  arch: "N/A"
  cve: "PDF Metadata Information Disclosure"
  services: ["Document Forensics"]
---

## Phase 1: Inspecting Document Structure

We are given a PDF document `confidential.pdf` filled with nonsense placeholder text. Rather than looking solely at visual rendered pages, forensic inspection begins by examining document metadata.

```bash
# Inspecting document metadata:
exiftool confidential.pdf
```

---

## Phase 2: Metadata Field Enumeration & Flag Discovery

Running `exiftool` reveals all document properties (Author, Creator, Subject, Keywords, Custom Properties). The flag is clearly embedded in one of the metadata descriptor fields.

```bash
# Filtering for flag formats:
exiftool confidential.pdf | grep -i "pico"
# Subject: [REDACTED - Click "Reveal Flag" below]
```

---

## Phase 3: Flag Verification

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
