/**
 * Модуль подготовки данных для таблицы
 *
 * Этот модуль отвечает за преобразование исходных данных (продавцы,
 * покупатели, записи покупок) в удобный формат для отображения в таблице.
 */

import { makeIndex } from "./lib/utils.js";

/**
 * Инициализация и нормализация данных
 *
 * @param {Object} sourceData - Исходные данные с сервера или тестовые данные
 * @param {Array} sourceData.sellers - Массив продавцов
 * @param {Array} sourceData.customers - Массив покупателей
 * @param {Array} sourceData.purchase_records - Массив покупок (чеки)
 * @returns {Object} - Объект с нормализованными данными
 *   - {Object} sellers - Индекс продавцов {id: "Имя Фамилия"}
 *   - {Object} customers - Индекс покупателей {id: "Имя Фамилия"}
 *   - {Array} data - Записи покупок в табличном формате
 */
export function initData(sourceData) {
    const sellers = makeIndex(
        sourceData.sellers,
        "id",
        v => `${v.first_name} ${v.last_name}`
    );

    const customers = makeIndex(
        sourceData.customers,
        "id",
        v => `${v.first_name} ${v.last_name}`
    );

    const data = sourceData.purchase_records.map(item => ({
        id: item.receipt_id,
        date: item.date,
        seller: sellers[item.seller_id],
        customer: customers[item.customer_id],
        total: item.total_amount
    }));

    return { sellers, customers, data };
}
