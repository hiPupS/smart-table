/**
 * Главный модуль приложения
 *
 * Здесь происходит инициализация таблицы, подключение всех модулей
 * (поиск, фильтрация, сортировка, пагинация) и запуск рендера.
 */

import "./style.css";
import { initData } from "./data.js";
import { initTable } from "./components/table.js";
import { initSorting } from "./components/sorting.js";
import { initFiltering } from "./components/filtering.js";
import { initSearching } from "./components/searching.js";
import { initPagination } from "./components/pagination.js";

// Константы конфигурации
const DEFAULT_ROWS_PER_PAGE = 10;

// Тестовые данные (можно заменить на загрузку с сервера)
const testData = {
    sellers: [
        { id: 1, first_name: "Иван", last_name: "Иванов" },
        { id: 2, first_name: "Петр", last_name: "Петров" }
    ],
    customers: [
        { id: 1, first_name: "Алексей", last_name: "Сидоров" },
        { id: 2, first_name: "Мария", last_name: "Смирнова" }
    ],
    purchase_records: [
        {
            receipt_id: 1,
            date: "2023-01-15",
            seller_id: 1,
            customer_id: 1,
            total_amount: 2400
        },
        {
            receipt_id: 2,
            date: "2023-01-16",
            seller_id: 2,
            customer_id: 2,
            total_amount: 1050
        }
    ]
};

// Инициализация данных
const { data, sellers, customers } = initData(testData);

// Инициализация таблицы
const sampleTable = initTable(
    {
        tableTemplate: "table",
        rowTemplate: "row",
        before: ["search", "header", "filter"],
        after: ["pagination"]
    },
    render
);

// Инициализация модулей
const applySearching = initSearching(["date", "seller", "customer", "total"]);
const applyFiltering = initFiltering(sampleTable.filter.elements, {
    searchBySeller: Object.values(sellers),
    searchByCustomer: Object.values(customers)
});
const applySorting = initSorting([
    sampleTable.header.elements.sortByDate,
    sampleTable.header.elements.sortByTotal
]);
const applyPagination = initPagination(
    sampleTable.pagination.elements,
    (el, page, isCurrent) => {
        const input = el.querySelector("input");
        const label = el.querySelector("span");
        input.value = page;
        input.checked = isCurrent;
        label.textContent = page;
        return el;
    }
);

/**
 * Сбор состояния формы управления таблицей
 * @returns {Object} - Текущее состояние таблицы
 */
function collectState() {
    const formData = new FormData(sampleTable.container);
    const state = Object.fromEntries(formData.entries());

    return {
        ...state,
        rowsPerPage: parseInt(state.rowsPerPage || DEFAULT_ROWS_PER_PAGE, 10),
        page: parseInt(state.page || 1, 10)
    };
}

/**
 * Главная функция рендера
 *
 * @param {string} [action] - Текущее действие (search, filter, sort, paginate)
 */
function render(action) {
    let state = collectState();
    let result = [...data];

    // Последовательность обработки
    result = applySearching(result, state, action);
    result = applyFiltering(result, state, action);
    result = applySorting(result, state, action);
    result = applyPagination(result, state, action);

    sampleTable.render(result);
}

// Инициализация приложения
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#app").appendChild(sampleTable.container);
    render();
});
