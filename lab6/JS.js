let n = parseInt(prompt('Введите количество процессов'));
let time = [];
let priority = [];
let sumoftime = 0;

for (let i = 0; i < n; i++)
{
    time[i] = parseInt(prompt(`Введите продолжительность процесса P${i}`));
    priority[i] = parseInt(prompt(`Введите приоритет процесса P${i}`));
    document.write(`Продолжительность процесса P${i}: ${time[i]}<br>`);
    document.write(`Приоритет процесса P${i}: ${priority[i]}<br>`);
    document.write('<br>');
    sumoftime += time[i];
}

let table = [];

for (let i = 0; i < n; i++)
{
    table[i] = []; 
    for (let j = 0; j < sumoftime; j++)
    {
        table[i][j] = '0'; 
    }
}

let copytime = time;
let sorttime = time.slice(0).sort();
let copyprior = priority;
let sortprior = priority.slice(0).sort();

for (let i = 0; i < n; i++)
{
    for (let j = 0; j < n; j++)
    {
        if (sortprior[i] == copyprior[j])
        {
            for (let k = 0; k < copytime[j]; k++)
            {
                table[j][k] = 'И';
            }
        }
    }
}

let sum = 0;
let num = 0;

for (let i = 1; i < n; i++)
{
    for (let j = 0; j < n; j++)
    {
        if (sortprior[i] == copyprior[j])
        {
            for (let k = 0; k < n; k++)
            {
                if (sortprior[i - 1] == copyprior[k])
                {
                    num = k;
                }  
            }
            sum += copytime[num];
            for (let z = 0; z < sum; z++)
            {
                table[j][z + copytime[j]] = 'Г';
            }
        }
    }
}

for (let i = 0; i < n; i++)
{
    document.write(`P${i}: `);
    for (let j = sumoftime - 1; j >= 0; j--)
    {
        if (table[i][j] == 0)
            continue;
        else
            document.write(table[i][j] + ' ');
    }
    document.write('<br>');
}