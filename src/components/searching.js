import { createComparison, rules } from "../lib/compare.js";

export function initSearching(searchFieldName) {
  // 1. Создаём готовую функцию-правило для поиска по нескольким полям
  const searchRule = rules.searchMultipleFields(
    searchFieldName,
    ["date", "customer", "seller"],
    false 
  );
  const compare = createComparison(
    ["skipEmptyTargetValues"], // имя правила, которое превратится в функцию
    [searchRule]              // уже готовая функция правила поиска
  );

  return (data, state, action) => {
    const searchValue = state[searchFieldName];

    // Если поиска нет — возвращаем все данные
    if (!searchValue) {
      return data;
    }

    return data.filter((row) => compare(row, state));
  };
}
