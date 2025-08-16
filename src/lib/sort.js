const sortUp = field => (a, b) => a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0;
const sortDown = field => (a, b) => a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;

const sortFn = {
    up: sortUp,
    down: sortDown
};

export const sortMap = {
    none: 'up',
    up: 'down',
    down: 'none'
};

export function sortCollection(arr, field, order) {
    if (!field || order === 'none' || !sortFn[order]) return arr;
    return arr.slice().sort(sortFn[order](field)); // slice() для копии массива
}
