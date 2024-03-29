/*
Render input table that bind directly into matrix.

This input table only accept number value, if input is not-a-number,
then the cell that its binding to 's value will be 0.

Boundary cells have #1565C0 color.
Not-a-number cells have #C62828 color.
*/
function getInputTable(matrix) {
    const table = document.createElement("TABLE");
    table.id = "id";
    for (let row = 0; row < matrix.rows; row++) {
        const tr = table.insertRow(row);
        for (let col = 0; col < matrix.cols; col++) {
            const input = document.createElement("INPUT");
            input.value = matrix.data[row][col];
            input.addEventListener('keyup',() => bind(row, col, matrix, input));
            input.setAttribute("name","matrix-table-input");
            setDefaultColor(row, col, matrix, input);
            tr.insertCell(col).appendChild(input);
        }
    }
    return table;
}

function setDefaultColor(row, col, matrix, inputEl) {
    const isBoundary =
        row === 0 ||
        col === 0 ||
        row === matrix.rows - 1 ||
        col === matrix.cols - 1;
    if (isBoundary)
        inputEl.style.color = "#1565C0";
    else
        inputEl.style.color = "black";
}

function bind(row, col, matrix, inputEl) {
    setDefaultColor(row, col, matrix, inputEl);
    if (isNumber(inputEl.value)) {
        matrix.data[row][col] = Number(inputEl.value);
    } else {
        matrix.data[row][col] = 0;
        inputEl.style.color = "#C62828";
    }
}

function isValidSizeInput(str) {
    // this regex test input format "number x number"
    return str.trim().match(/^([1-9]\d*\s*x\s*[1-9]\d*)$/g);
}

function extractSize(str) {
    // get fist 2 numbers that separate by "x"
    const size = str
        .split("x")
        .filter(value => isNumber(value));
    return {rows: Number(size[0]), cols: Number(size[1])}
}
