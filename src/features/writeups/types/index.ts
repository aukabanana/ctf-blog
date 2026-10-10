export type Category = 'Web' | 'Pwn' | 'Crypto' | 'Rev' | 'Forensics' | 'OSINT' | 'Misc';

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Insane';

export interface DossierData {
  targetIp: string;
  os: string;
  arch: string;
  cve: string;
  services?: string[];
}

export interface KillChainStep {
  id: string;
  name: string;
  label?: string;
}

export interface WriteupSection {
  title: string;
  content: string;
  code?: string;
  language?: string;
  downloadName?: string;
}

export interface WriteupItem {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  event?: string;
  author: string;
  team?: string;
  date: string;
  summary: string;
  dossier: DossierData;
  killChain: KillChainStep[];
  sections: WriteupSection[];
  flag?: string;
}

export interface BadgeStyle {
  color: string;
  bg?: string;
  text?: string;
  border?: string;
  shadow?: string;
}
