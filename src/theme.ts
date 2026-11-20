import { createLightTheme, type BrandVariants } from '@fluentui/react-components';

const accessKartBrand: BrandVariants = {
  10: '#061d19',
  20: '#0a3029',
  30: '#0e443a',
  40: '#12564a',
  50: '#176b5b',
  60: '#21806e',
  70: '#309582',
  80: '#47aa96',
  90: '#66bdab',
  100: '#88d0bf',
  110: '#a9dfd2',
  120: '#c4e9e0',
  130: '#d8f0ea',
  140: '#e8f6f2',
  150: '#f4fbf9',
  160: '#fbfefd',
};

export const appTheme = {
  ...createLightTheme(accessKartBrand),
  fontFamilyBase: 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
  colorBrandBackground: '#176b5b',
  colorBrandBackgroundHover: '#12564a',
  colorBrandBackgroundPressed: '#0e443a',
  colorBrandForeground1: '#176b5b',
};
