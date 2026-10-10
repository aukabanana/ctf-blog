---
title: "Neuron Express 0: Mathematical Boundary Formulation"
event: "CyLab Academy"
category: "Misc"
difficulty: "Easy"
solvedDate: 2026-08-01
tags: ["ai", "perceptron", "weights-and-bias", "math"]
isPublic: true
author: "AUKA"
summary: "Discovering a 1D perceptron decision boundary and formulating its exact mathematical expression in the form w*x + b."
dossier:
  targetIp: "aureolin-pixie.cylabacademy.net"
  os: "Linux"
  arch: "x86_64"
  cve: "Perceptron Mathematical Derivation"
  services: ["TCP/Socket Service (Netcat)"]
---

## Phase 1: Boundary Discovery & Probing

The challenge tests our ability to derive the internal linear equation `w*x + b = 0` governing a 1D neuron from empirical inputs and outputs.

```bash
# Connect to the remote environment:
nc aureolin-pixie.cylabacademy.net <PORT>

# Evaluating test inputs to locate the exact transition point:
# Sample values around the transition boundary to calculate weight (w) and bias (b).
```

---

## Phase 2: Formulating Weight and Bias (w*x + b)

Using the probed transition point and slope sign, we formulate the exact mathematical representation of the decision boundary and submit the corresponding equation parameters.

```python
#!/usr/bin/env python3
# Calculating weight and bias for 1D perceptron
# Boundary equation: w * x + b = 0 -> x = -b / w
def solve_boundary(transition_x, slope_positive=True):
    w = 1.0 if slope_positive else -1.0
    b = -w * transition_x
    return f"{w}*x + {b}"

print("[+] Derived linear expression:", solve_boundary(2.5))
```

---

## Phase 3: Flag Capture

Sending the correct mathematical expression solves the challenge and yields the flag.

```text
Flag: [REDACTED - Click "Reveal Flag" below]
```
