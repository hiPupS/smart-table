// Утилита для клонирования шаблона
export function cloneTemplate(template) {
    const content = template.content.firstElementChild.cloneNode(true);
    const elements = {};
    content.querySelectorAll('[data-element]').forEach(el => {
        elements[el.dataset.element] = el;
    });
    return { container: content, elements };
}

// Маппинг для сортировки
export const sortMap = {
    none: 'asc',
    asc: 'desc',
    desc: 'none'
};

// Построение массива страниц для пагинации
export function getPages(current, total, max = 5) {
    const pages = [];
    let start = Math.max(1, current - Math.floor(max / 2));
    let end = Math.min(total, start + max - 1);

    if (end - start + 1 < max) {
        start = Math.max(1, end - max + 1);
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
}
