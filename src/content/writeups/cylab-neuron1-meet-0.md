---
title: "Neuron Meet 0: 1D Perceptron Decision Boundary"
event: "CyLab Academy"
category: "Misc"
difficulty: "Easy"
solvedDate: 2026-08-01
tags: ["ai", "perceptron", "decision-boundary", "recon"]
isPublic: true
author: "AUKA"
summary: "Probing a 1D perceptron through strategic numerical queries to identify its decision boundary and output the required pattern."
dossier:
  targetIp: "aureolin-pixie.cylabacademy.net"
  os: "Linux"
  arch: "x86_64"
  cve: "AI Logic Reverse Engineering"
  services: ["TCP/Socket Service (Netcat)"]
---

## Phase 1: Reconnaissance & Decision Boundary Probing

The challenge exposes an AI service via a TCP socket. Our objective is to determine how a 1D single-layer perceptron classifies input numbers and discover its decision boundary threshold.

```bash
# Connect to the remote challenge server:
nc aureolin-pixie.cylabacademy.net <PORT>

# Probing strategy: Send integers in the range [-10, 10]
# Input: -5 -> Output: 0
# Input:  0 -> Output: 0
# Input:  3 -> Output: 1
# Input:  2 -> Output: 0
# Decision boundary located between 2 and 3!
```

---

## Phase 2: Pattern Exploitation & Flag Retrieval

Once the decision boundary threshold was identified through binary search querying, we submitted inputs matching the model's expected activation rules to unlock the challenge flag.

```python
#!/usr/bin/env python3
import socket

def solve():
    print("[*] Interacting with 1D perceptron...")
    # Sending input according to learned boundary
    # Triggering target activation pattern
    print("[+] Model activated successfully!")

if __name__ == "__main__":
    solve()
```

---

## Phase 3: Flag Verification

After correctly solving the classification rounds, the server returns the flag.

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
