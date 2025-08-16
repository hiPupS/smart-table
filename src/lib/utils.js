/**
 * Клонирует шаблон и собирает все элементы с атрибутом data-name
 */
export function cloneTemplate(templateId) {
    const template = document.getElementById(templateId);
    const clone = template.content.firstElementChild.cloneNode(true);
    const elements = Array.from(clone.querySelectorAll('[data-name]'))
        .reduce((acc, el) => ({ ...acc, [el.dataset.name]: el }), {});
    return { container: clone, elements };
}

/**
 * Преобразует FormData в обычный объект
 */
export function processFormData(formData) {
    return Object.fromEntries(formData.entries());
}

/**
 * Карта переключения сортировки
 */
export const sortMap = {
    'none': 'asc',
    'asc': 'desc',
    'desc': 'none'
};

/**
 * Индексация массива по уникальному полю
 */
export const makeIndex = (arr, field, fn) =>
    arr.reduce((acc, item) => ({ ...acc, [item[field]]: fn(item) }), {});

/**
 * Возвращает массив номеров страниц
 */
export function getPages(currentPage, maxPage, limit = 5) {
    currentPage = Math.max(1, Math.min(maxPage, currentPage));
    limit = Math.min(maxPage, limit);

    let start = Math.max(1, currentPage - Math.floor(limit / 2));
    let end = Math.min(maxPage, start + limit - 1);

    if (end > maxPage) {
        end = maxPage;
        start = Math.max(1, end - limit + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
