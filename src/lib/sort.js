/**
 * Модуль сортировки массива объектов
 *
 * Использует модуль compare.js и его систему правил для гибкой сортировки.
 */

import { createComparison, rules } from './compare.js';

/**
 * Сортирует массив объектов по указанному полю
 *
 * @param {Array<Object>} data - массив объектов для сортировки
 * @param {string} field - имя поля для сортировки
 * @param {boolean} ascending - сортировать по возрастанию (true) или по убыванию (false)
 * @returns {Array<Object>} - новый отсортированный массив
 */
export function sortByField(data, field, ascending = true) {
    if (!Array.isArray(data)) {
        throw new Error('sortByField: data must be an array');
    }

    // Создаём функцию сравнения для сортировки по одному полю
    const compareFn = (a, b) => {
        const cmp = createComparison([
            'skipNonExistentSourceFields',
            'skipEmptyTargetValues',
            'exactEquality'
        ]);

        const result = cmp({ [field]: a[field] }, { [field]: b[field] });

        if (result) return 0;

        // Числа сортируем как числа, строки как строки
        if (typeof a[field] === 'number' && typeof b[field] === 'number') {
            return ascending ? a[field] - b[field] : b[field] - a[field];
        }

        const aVal = String(a[field] ?? '');
        const bVal = String(b[field] ?? '');
        return ascending
            ? aVal.localeCompare(bVal, undefined, { sensitivity: 'base' })
            : bVal.localeCompare(aVal, undefined, { sensitivity: 'base' });
    };

    return [...data].sort(compareFn);
}
