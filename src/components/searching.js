import {createComparison, rules} from "../lib/compare.js";

export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison({
        skipEmptyTargetValues: true,
        searchMultipleFields: rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false)
    });
    
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        
        
        const searchValue = state ? state[searchField] : '';
        
        if (!searchValue || searchValue.trim() === '') {
            return data; 
        }
        
        return data.filter(row => compare(row, state));
    };
}