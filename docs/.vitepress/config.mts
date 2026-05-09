import { defineConfig } from 'vitepress';

const SLUG = 'palestra';
const TITLE = 'Demo Palestra — Federico Calò';

export default defineConfig({
  title: TITLE,
  description: 'Documentazione tecnica del template Angular 21 SSR per Palestra.',
  base: `/demo-${SLUG}/`,
  cleanUrls: true,
  lang: 'it-IT',

  themeConfig: {
    siteTitle: 'Demo Palestra',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tier & Features', link: '/tier-features' },
      { text: 'Architettura', link: '/architecture' },
      { text: 'Mock Data', link: '/mock-data' },
      { text: 'Customization', link: '/customization' },
      { text: 'Deployment', link: '/deployment' },
      { text: 'Demo live ↗', link: `https://${SLUG}.demo.federicocalo.dev` }
    ],

    sidebar: [
      {
        text: 'Guida',
        items: [
          { text: 'Introduzione', link: '/' },
          { text: 'Tier & Features', link: '/tier-features' },
          { text: 'Architettura', link: '/architecture' },
          { text: 'Mock data', link: '/mock-data' },
          { text: 'Customization', link: '/customization' },
          { text: 'Deployment', link: '/deployment' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: `https://github.com/fedcal/demo-${SLUG}` }
    ],

    footer: {
      message: 'Demo di <a href="https://federicocalo.dev">Federico Calò</a> — MIT License',
      copyright: `© ${new Date().getFullYear()} Federico Calò`
    },

    search: {
      provider: 'local'
    }
  }
});
