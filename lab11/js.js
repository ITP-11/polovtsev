let indexTable = new Map();
let cach = new Map();

class block {
    name;
    start;
}

let memory = [];
memory.length = 40;
for (let i = 0; i < memory.length; i++) {
    memory[i] = 0;
}
let freeSize = memory.length;
const blockSize = 4;
let blocks = [];

function addFile() {
    let fileName = document.getElementById('addFileName').value;
    let dirName = document.getElementById('addDirName').value;
    if (dirName !== '') {
        fileName = `${dirName}/${fileName}`;
    }
    for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].name === fileName) {
            alert('Файл с таким именем уже существует');
            return;
        } 
    }
    let sizeInKbs = parseInt(document.getElementById('addFileSize').value);
    let sizeInBlocks = Math.floor(sizeInKbs / blockSize);
    if (sizeInKbs % blockSize !== 0) {
        sizeInBlocks++;
    }
    if (sizeInBlocks <= freeSize) {
        let f = 0;
        for (let i = 0; i < memory.length; i++) {
            if (memory[i] === 0) {
                let freeSeg = 0;
                let start = i;
                let j = i;
                while (memory[j] === 0) {
                    freeSeg++;
                    j++;
                }
                if (sizeInBlocks <=  freeSeg) {
                    indexTable.set(fileName, start);
                    cach.set(fileName, start);
                    for (let k = i; k < i + sizeInBlocks; k++) {
                        memory[k] = `${fileName}`;
                        blocks.push(new block);
                        blocks[blocks.length - 1].name = fileName;
                        blocks[blocks.length - 1].start = start;
                        start++;
                    }
                    f = 1;
                    break;
                }
            }
        }
        if (f === 0) {
            alert('Недостаточно памяти для добавления файла');
        } else {
            freeSize -= sizeInBlocks;
            document.getElementById('freeSize').innerText = `${freeSize * 4} Кб`;
            createTable();
        }
    } else {
        alert('Недостаточно памяти для добавления файла');
    }
}

let addFileButton = document.getElementById('addFile');
addFileButton.addEventListener('click', addFile);

function deleteFile() {
    let fileName = document.getElementById('delFileName').value;
    let start = cach.get(fileName);
    cach.delete(fileName);
    if (start === undefined) {
        start = indexTable.get(fileName);
        indexTable.delete(fileName);
        if (start === undefined) {
            alert('Файл не найден');
            return;
        }
    } else {
        let size = 0;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].name === fileName) {
                size++;
                blocks.splice(i, 1);
                i--;
            }
        }
        for (let i = start; i < start + size; i++) {
            memory[i] = 0;
        }
        freeSize += size;
        document.getElementById('freeSize').innerText = `${freeSize * 4} Кб`;
        createTable();
    }
}

let delFileButton = document.getElementById('deleteFile');
delFileButton.addEventListener('click', deleteFile);

function createTable() {
    document.getElementById('table').innerHTML = '';
    let table = document.createElement('table');
    table.setAttribute('border', '1');
    table.innerHTML = '<tr>';
    for (let i = 0; i < memory.length; i++) {
        let td = document.createElement('td');
        td.setAttribute('width', `50px`);
        td.setAttribute('height', `25px`);
        if (memory[i] !== 0) {
            td.setAttribute('bgcolor', `#00FF00`);
            td.innerText = memory[i]; 
        }
        table.append(td);
        if (i === memory.length / 2 - 1) {
            table.innerHTML += '</tr><tr>';
        }
    }
    table.innerHTML += '</tr>';
    document.getElementById('table').append(table);
}
