import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    title: z.string(),
    event: z.string().default('STUDIO Comp'),
    category: z.enum(['Web', 'Pwn', 'Crypto', 'Rev', 'Forensics', 'OSINT', 'Misc']),
    difficulty: z.enum(['Easy', 'Medium', 'Hard', 'Insane']),
    points: z.number().default(100),
    solvedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    isPublic: z.boolean().default(true),
    author: z.string().default('STUDIO'),
    summary: z.string().optional(),
    dossier: z
      .object({
        targetIp: z.string().default('10.10.11.x'),
        os: z.string().default('Linux'),
        arch: z.string().default('x86_64'),
        cve: z.string().default('CTF Challenge'),
        services: z.array(z.string()).default([]),
      })
      .optional(),
  }),
});

export const collections = { writeups };
