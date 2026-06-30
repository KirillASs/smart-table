import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    
        .forEach((elementName) => {                        
            elements[elementName].append(                    
                ...Object.values(indexes[elementName])        
                        .map(name => {                        
                            const option = document.createElement('option');
                            option.value = name;
                            option.textContent = name;
                        })
            )
        }) 
    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        console.log(action)
        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data;
    }
}