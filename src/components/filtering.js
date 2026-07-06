import { createComparison, rules, defaultRules } from "../lib/compare.js";

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  Object.keys(indexes).forEach((elementName) => {
    const select = elements[elementName];
    if (!select || !select.tagName || select.tagName !== "SELECT") {
      console.warn(`No valid select found for index: ${elementName}`);
      return;
    }

    select.innerHTML = ""; // очищаем

    // Опция "Все"
    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = "Все";
    select.append(allOption);

    // Остальные опции
    const options = Object.values(indexes[elementName]).map((name) => {
      const option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      return option;
    });

    select.append(...options);
  });

  // @todo: #4.3 — настроить компаратор
  // defaultRules — это уже массив правил, который умеет работать с FormData
  const compare = createComparison(defaultRules);

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    if (action && action.name === "clear") {
      const field = action.dataset?.field;
      if (field) {
        const parent = action.parentElement;
        if (parent) {
          const inputOrSelect = parent.querySelector("input, select");
          if (inputOrSelect) {
            inputOrSelect.value = "";
          }
        }

        // Сбрасываем значение в state, чтобы фильтрация перестала применяться
        if (state && state[field] !== undefined) {
          state[field] = "";
        }
      }
    }

    if (!data || !Array.isArray(data)) {
      console.warn("Filtering: data is not an array, returning empty array");
      return [];
    }

    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = state
      ? Object.values(state).some(
          (value) => value !== "" && value !== null && value !== undefined
        )
      : false;

    if (!hasActiveFilters) {
      return data;
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
