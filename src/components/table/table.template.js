const CODES = {
    A: 65,
    Z: 90
};

function createCell(data = '', idx) {
    return `
    <div class="cell" contenteditable data-columnowner=${idx}>${data}</div>
    `;
}

function createCol(col, idx) {
    return `
    <div class="column" data-type="resizable" data-col=${idx}>
        <div class="col-name">${col}</div>
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(idx, content) {
    const resizer = idx ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${idx}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
    </div>`;
}

function toSymbol(_, idx) {
    return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsNumber = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const cols = new Array(colsCount).fill('').map(toSymbol).map(createCol).join('');
    const cells = new Array(colsCount).fill('').map(createCell).join('');
    rows.push(createRow('', cols));
    for (let i = 0; i < rowsNumber; i++) {
        rows.push(createRow(i + 1, cells));
    }
    return rows.join('');
}
