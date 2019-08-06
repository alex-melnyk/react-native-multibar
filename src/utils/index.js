export * from './Colors';

export const generateRGBColor = () => `rgb(${[...new Array(3)].map(() => Math.random() * 256).join(',')})`;