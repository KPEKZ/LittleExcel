const CODES = {
    A: 65,
    Z: 90
};

function createCell(data = '') {
    return `
    <div class="cell" contenteditable>${data}</div>
    `;
}

function createCol(col) {
    return `
    <div class="column">${col}</div>
    `;
}

function createRow(idx, content) {
    return `
    <div class="row">
        <div class="row-info">${idx}</div>
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
