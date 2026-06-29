import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    // @todo: #1.2 —  вывести дополнительные шаблоны до и после таблицы

    // @todo: #1.3 —  обработать события и вызвать onAction()

    const render = (data) => {
        // @todo: #1.1 — преобразовать данные в массив строк на основе шаблона rowTemplate
        
        
        const nextRows = data.map(item =>{
            const row = cloneTemplate(rowTemplate)
            Object.keys(item).forEach(key => {
                if(row.elements && row.elements.hasOwnProperty(key)){
                    const rowEl = row.elements[key]
                    if (rowEl.value !== undefined) {
                        rowEl.value = item[key] ?? '';
                    } else {
                        rowEl.textContent = item[key] ?? '';
                    }
                    
                }
                
            })
           return row.container
        });
        console.log(nextRows)
        root.elements.rows.replaceChildren(...nextRows);
        
    }

    return {...root, render};
}