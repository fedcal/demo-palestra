// Tipi TypeScript per i dati mock di Forge Fitness

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface ServiziPalestra {
  parcheggioGratuito: boolean;
  docciaSpogliatoi: boolean;
  accessibileDisabili: boolean;
  kidsZone: boolean;
  wifiGratuito: boolean;
  ariaCondizionata: boolean;
  barProteico: boolean;
  armadietti: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  servizi: ServiziPalestra;
  metaSeo: MetaSeo;
}

export type LivelloCorso = 'Principiante' | 'Intermedio' | 'Avanzato' | 'Tutti';
export type CategoriaCorso = 'cardio' | 'functional' | 'mente-corpo' | 'tonificazione' | 'recupero';

export interface Corso {
  id: string;
  nome: string;
  istruttore: string;
  durata: number;
  livello: LivelloCorso;
  orari: string[];
  postiMax: number;
  descrizione: string;
  categoria: CategoriaCorso;
  featured: boolean;
}

export interface Abbonamento {
  id: string;
  nome: string;
  prezzo: number;
  prezzoOriginale: number | null;
  sconto: number | null;
  durata: string;
  accessi: string;
  highlight: boolean;
  badge: string | null;
  features: string[];
}

export interface Istruttore {
  id: string;
  nome: string;
  specializzazione: string;
  certificazioni: string[];
  bio: string;
  anniEsperienza: number;
  foto: string;
  iniziale: string;
  corsi: string[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface CorsiData {
  corsi: Corso[];
}

export interface AbbonamentiData {
  abbonamenti: Abbonamento[];
}

export interface IstruttoriData {
  istruttori: Istruttore[];
}

export interface FaqData {
  faq: FaqItem[];
}
