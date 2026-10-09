import { getCollection, type CollectionEntry } from 'astro:content';
import { SAMPLE_WRITEUPS } from '../data/sample-writeups';
import type { WriteupItem, KillChainStep, WriteupSection } from '../types';

export async function getWriteups(): Promise<WriteupItem[]> {
  try {
    const collection = await getCollection('writeups');
    if (!collection || collection.length === 0) {
      return SAMPLE_WRITEUPS;
    }

    const parsed: WriteupItem[] = collection
      .filter((entry: CollectionEntry<'writeups'>) => !entry.id.startsWith('_'))
      .map((entry: CollectionEntry<'writeups'>) => {
        const body = entry.body || '';

        // Split body into sections by "## " headers
        const rawSections = body.split(/(?=^##\s+)/m).filter((s: string) => s.trim().length > 0);

        const sections: WriteupSection[] = rawSections.map((raw: string) => {
          const lines = raw.trim().split('\n');
          const titleLine = lines[0].replace(/^##\s+/, '').trim();
          const rest = lines.slice(1).join('\n');

          // Extract code block if present
          const codeMatch = rest.match(/```(\w+)?\n([\s\S]*?)```/);
          let code: string | undefined = undefined;
          let language: string | undefined = undefined;
          let content = rest;

          if (codeMatch) {
            language = codeMatch[1] || 'bash';
            code = codeMatch[2].trim();
            content = rest.replace(/```(\w+)?\n[\s\S]*?```/, '').trim();
          }

          return {
            title: titleLine,
            content: content || 'Detailed walkthrough steps and analysis.',
            code,
            language,
          };
        });

        const killChain: KillChainStep[] = sections.map((sec: WriteupSection, idx: number) => ({
          id: `step-${idx + 1}`,
          name: `${idx + 1}. ${sec.title.replace(/^Phase\s*\d*:\s*/i, '').slice(0, 18)}`,
          label: sec.title,
        }));

        const id = entry.id.replace(/\.md$/, '');

        return {
          id,
          title: entry.data.title,
          category: entry.data.category,
          difficulty: entry.data.difficulty,
          event: entry.data.event || 'AUKA CTF',
          author: entry.data.author || 'AUKA',
          date: entry.data.solvedDate.toISOString().split('T')[0],
          summary: entry.data.summary || '',
          flag: entry.data.flag,
          dossier: entry.data.dossier || {
            targetIp: '10.10.11.x',
            os: 'Linux',
            arch: 'x86_64',
            cve: entry.data.tags[0] || 'CTF Challenge',
            services: ['HTTP / Web Services'],
          },
          killChain: killChain.length > 0 ? killChain : [
            { id: 'step-1', name: '1. Recon', label: 'Reconnaissance' },
            { id: 'step-2', name: '2. Exploit', label: 'Exploitation' },
            { id: 'step-3', name: '3. Root & Flag', label: 'Capture Flag' },
          ],
          sections: sections.length > 0 ? sections : [
            {
              title: 'Exploitation Walkthrough',
              content: body,
            },
          ],
        };
      });

    return parsed.length > 0 ? parsed : SAMPLE_WRITEUPS;
  } catch (err) {
    console.error('Failed to load markdown writeups, using fallback sample data:', err);
    return SAMPLE_WRITEUPS;
  }
}
