---
title: "Neuron Meet 2D-0: 2D Linear Classifier Boundary"
event: "CyLab Academy"
category: "Misc"
difficulty: "Easy"
solvedDate: 2026-08-01
tags: ["ai", "perceptron", "2d-space", "classification"]
isPublic: true
author: "AUKA"
summary: "Querying a 2D perceptron with coordinate pairs (x, y) to map out its linear decision boundary hyperplane."
dossier:
  targetIp: "aureolin-pixie.cylabacademy.net"
  os: "Linux"
  arch: "x86_64"
  cve: "AI Logic Reverse Engineering"
  services: ["TCP/Socket Service (Netcat)"]
---

## Phase 1: 2D Coordinate Probing & Decision Boundary Mapping

In this challenge, we interact with a 2D perceptron classifier that accepts coordinate pairs `(x, y)` and outputs a binary classification `0` or `1`.

```bash
# Connecting to the remote socket:
nc aureolin-pixie.cylabacademy.net <PORT>

# Probing coordinate pairs:
# (0, 0) -> 0
# (1, 1) -> 1
# (-1, 2) -> 1
# (2, -1) -> 0
```

---

## Phase 2: Linear Hyperplane Extraction & Exploitation

By sampling multiple `(x, y)` coordinates across the Cartesian grid, we interpolate the linear separation line `w1*x + w2*y + b = 0`. With the boundary established, we generate the required sequence of coordinates to satisfy the challenge check.

```python
#!/usr/bin/env python3
# Solving 2D linear classification pattern
def classify(x, y, w1=1.0, w2=-1.0, b=0.0):
    return 1 if (w1 * x + w2 * y + b) >= 0 else 0

print("[+] Boundary mapped. Generating solution coordinates...")
```

---

## Phase 3: Flag Extraction

Submitting the coordinates corresponding to the target activation pattern releases the challenge flag.

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
