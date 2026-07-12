// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://yaericure.github.io',
  base: '/underlying-logic',
  integrations: [
    starlight({
      title: '底層邏輯',
      description: '看清這個世界的底牌:是非對錯、思考問題、個體進化、理解他人與社會協作。',
      defaultLocale: 'root',
      locales: { root: { label: '正體中文', lang: 'zh-TW' } },
      customCss: ['./src/styles/theme.css', './src/styles/sidebar-num.css'],
      lastUpdated: false,
      pagination: true,
      sidebar: [
        {
          label: '是非對錯',
          items: [
            { label: '三種對錯觀與人性道德法律', slug: 'unit01' },
            { label: '人生三層智慧與邏輯推演', slug: 'unit02' },
            { label: '事實、洗腦與贏得辯論', slug: 'unit03' },
          ],
        },
        {
          label: '思考問題',
          items: [
            { label: '解決問題與洞察本質', slug: 'unit04' },
            { label: '系統思考與邏輯閉環', slug: 'unit05' },
            { label: '複利思維與機率思維', slug: 'unit06' },
            { label: '數學思維與系統思維', slug: 'unit07' },
          ],
        },
        {
          label: '個體進化',
          items: [
            { label: '人生商業模式:能力×效率×槓桿', slug: 'unit08' },
            { label: '把工作當玩與時間管理', slug: 'unit09' },
            { label: '指數增長與十倍價值', slug: 'unit10' },
            { label: '人脈、知識技能與心態', slug: 'unit11' },
            { label: '人人都應該是自己的 CEO', slug: 'unit12' },
          ],
        },
        {
          label: '理解他人',
          items: [
            { label: '理解自己與他人的思維方式', slug: 'unit13' },
            { label: '幽默與洞察本質的比喻力', slug: 'unit14' },
            { label: '邊界感與創業者的心理驅動', slug: 'unit15' },
            { label: '世界三大法則', slug: 'unit16' },
          ],
        },
        {
          label: '社會協作',
          items: [
            { label: '戰略勢能與產品定價', slug: 'unit17' },
            { label: '利潤的來源與無 KPI 管理', slug: 'unit18' },
            { label: '事業合夥人與財富分配', slug: 'unit19' },
            { label: '分錢邏輯與信用資產', slug: 'unit20' },
            { label: '公平、效率與組織服從', slug: 'unit21' },
          ],
        },
      ],
    }),
    react(),
  ],
  vite: { plugins: [tailwindcss()] },
});
