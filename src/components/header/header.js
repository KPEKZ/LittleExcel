import { ExcelComponent } from 'core/excelComponent';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    toHTML() {
        return `<input type="text" class="input" value="Новая таблица">
        <div>
            <div class="button">
                <span class="material-icons">delete</span>
            </div>
            <div class="button">
                <span class="material-icons">close</span>
            </div>
        </div>`;
    }
}
