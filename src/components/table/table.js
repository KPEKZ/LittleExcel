import { ExcelComponent } from 'core/excelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            listeners: ['click', 'mousedown', 'mousemove', 'mouseup']
        });
    }

    toHTML() {
        return createTable(20);
    }

    onClick() {}

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
        }
    }

    onMousemove() {}

    onMouseup() {}
}
