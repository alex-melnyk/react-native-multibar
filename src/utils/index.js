

export function randomColor() {
    const values = [...new Array(3)].map(() => Math.random() * 256).join(',');

    return `rgb(${values})`;
}