import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        // Очищаем select перед заполнением
        elements[elementName].innerHTML = '';
        
        // Добавляем опцию "Все"
        const allOption = document.createElement('option');
        allOption.value = '';
        allOption.textContent = 'Все';
        elements[elementName].append(allOption);
        
        // Добавляем опции из индексов
        elements[elementName].append(
            ...Object.values(indexes[elementName])
                .map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
        );
    });
    
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        
        // ✅ Защита от undefined или не-массива
        if (!data || !Array.isArray(data)) {
            console.warn('Filtering: data is not an array, returning empty array');
            return [];
        }
        
        if (action && action.name === 'clear') {
            console.log('Clear action detected:', action);
            
            const field = action.dataset?.field;
            
            if (field) {
                const button = action;
                const parent = button.parentElement;
                
                if (parent) {
                    const input = parent.querySelector('input, select');
                    
                    if (input) {
                        input.value = '';
                        console.log(`Cleared input for field: ${field}`);
                    } else {
                        console.warn(`No input found in parent for field: ${field}`);
                    }
                }
                
                if (state && state[field] !== undefined) {
                    state[field] = '';
                }
            }
        }
        
        // @todo: #4.5 — отфильтровать данные используя компаратор
        // Проверяем, есть ли активные фильтры
        const hasActiveFilters = state ? Object.values(state).some(value => 
            value !== '' && value !== null && value !== undefined
        ) : false;
        
        // Если нет активных фильтров, возвращаем все данные
        if (!hasActiveFilters) {
            return data;
        }
        
        // Фильтруем данные с помощью компаратора
        return data.filter(row => compare(row, state));
    };
}