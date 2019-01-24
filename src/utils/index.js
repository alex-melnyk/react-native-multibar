export * from './Colors';

export const randomColor = () => `rgb(${[...new Array(3)].map(() => Math.random() * 256).join(',')})`;