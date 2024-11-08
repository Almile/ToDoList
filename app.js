class Task {
    constructor(year, month, day, type, description, status = false) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
        this.status = status; 
    }

    validateData() {
        for (let key in this) {
            if (this[key] === undefined || this[key] === "") {
                console.error(`O campo ${key} é obrigatório.`);
                return false;
            }
        }
        return true;
    }
}

class Database {
    constructor() {
        this.initDatabase();
    }

    initDatabase() {
        const id = localStorage.getItem('id');
        if (id === null) {
            localStorage.setItem('id', '0');
        }
    }

    loadTasks() {
        let tasks = [];
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let taskData = localStorage.getItem(i);
            if (taskData) {
                try {
                    let task = JSON.parse(taskData);
                    tasks.push(task);
                } catch (error) {
                    console.error(`Erro ao carregar a tarefa com id ${i}: ${error.message}`);
                }
            }
        }
        return tasks;
    }

    createTask(task) {
        let id = this.getNextId();
        task.id = id;
        localStorage.setItem(id, JSON.stringify(task));
        localStorage.setItem('id', id.toString());
    }

    updateTask(id, updatedData) {
        const taskData = localStorage.getItem(id);
        if (taskData) {
            const task = JSON.parse(taskData);
            Object.assign(task, updatedData);
            localStorage.setItem(id, JSON.stringify(task));
        }
    }

    removeTask(id) {
        localStorage.removeItem(id);
    }

    getNextId() {
        let currentId = localStorage.getItem('id');
        return parseInt(currentId) + 1;
    }
}

// Instanciar a classe database
const database = new Database();

function registerTask() {
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;

    let task = new Task(year, month, day, type, description);
    if (task.validateData()) {
        database.createTask(task);
        alert('Tarefa criada com sucesso!');
        loadTasks();
    } else {
        alert('Preencha todos os campos.');
    }
}

// Função para preencher o modal com as informações da tarefa
function editTask(taskId) {
    const taskData = localStorage.getItem(taskId);
    if (taskData) {
        const task = JSON.parse(taskData);
        
        document.getElementById('year').value = task.year;
        document.getElementById('month').value = task.month;
        document.getElementById('day').value = task.day;
        document.getElementById('type').value = task.type;
        document.getElementById('description').value = task.description;

        document.getElementById('myModal').setAttribute('data-task-id', taskId);
    }
}

// Função para salvar as alterações da tarefa
function saveTask() {
    const taskId = document.getElementById('myModal').getAttribute('data-task-id');

    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;

    let updatedTask = new Task(year, month, day, type, description);

    if (updatedTask.validateData()) {
        database.updateTask(taskId, updatedTask);
        alert('Tarefa atualizada com sucesso!');
        
        $('#myModal').modal('hide');

        loadTasks();
    } else {
        alert('Preencha todos os campos.');
    }
}

// Carrega as tarefas na tabela 
function loadTasks(tasks = database.loadTasks()) {
    let listTask = document.getElementById('listTasks');
    listTask.innerHTML = ''; 

    tasks.forEach((task) => {
        let row = listTask.insertRow();
        row.insertCell(0).innerHTML = `${task.day}/${task.month}/${task.year}`;
        row.insertCell(1).innerHTML = getTaskTypeName(task.type);
        row.insertCell(2).innerHTML = task.description;

        if (task.status) row.classList.add('completed');

        let btn = document.createElement('button');
        btn.className = 'btn btn-outline-danger m-2 btn-sm';
        btn.innerHTML = 'Delete';

        let btnEdit = document.createElement('button');
        btnEdit.className = 'btn btn-outline-secondary m-2 btn-sm';
        btnEdit.setAttribute('data-toggle', 'modal'); 
        btnEdit.setAttribute('data-target', '#myModal');
        btnEdit.innerHTML = 'Edit';

        btnEdit.addEventListener('click', () => editTask(task.id)); 
        btn.onclick = () => {
            if (confirm('Você tem certeza que deseja excluir essa tarefa?')) {
                database.removeTask(task.id);
                loadTasks();
            }
        };

        row.addEventListener('click', () => {
            task.status = !task.status;
            database.updateTask(task.id, { status: task.status });
            row.classList.toggle('completed', task.status);
        });

        row.insertCell(3).append(btn, btnEdit);
    });
}


// Função para obter o nome do tipo de tarefa
function getTaskTypeName(type) {
    switch (type) {
        case '1':
            return 'Studies';
        case '2':
            return 'Work';
        case '3':
            return 'Home';
        case '4':
            return 'Health';
        case '5':
            return 'Family';
        default:
            return 'Other';
    }
}


addEventListener('DOMContentLoaded', () => {
    if (document.body.contains(document.getElementById('listTasks'))) {
        loadTasks();
    }
});
   
// Pesquisar tarefas de acordo com os filtros preenchidos
function searchTasks() {
    let year = document.getElementById('searchYear').value;
    let month = document.getElementById('searchMonth').value;
    let day = document.getElementById('searchDay').value;
    let type = document.getElementById('searchType').value;
    let description = document.getElementById('searchDescription').value;

    let filteredTasks = database.loadTasks().filter((task) => {
        return (year === "" || task.year === year) &&
               (month === "" || task.month === month) &&
               (day === "" || task.day === day) &&
               (type === "" || task.type === type) &&
               (description === "" || task.description.includes(description));
    });

    // Criar o botão "Limpar filtros" que chama a função clearFilters 
    let btnErase = document.getElementById('btnErase');
    if (!btnErase) {
        btnErase = document.createElement('button');
        btnErase.id = 'btnErase'; 
        btnErase.className = 'erase ml-3 btn btn-outline-secondary';
        
        btnErase.innerHTML = '<ion-icon name="close-circle" class="mr-2"></ion-icon> Clear filters';
        
        btnErase.addEventListener('click', () => clearFilters());
        
        document.getElementById('btnSearch').appendChild(btnErase);
    }

    loadTasks(filteredTasks);
}

// Função para limpar os valores dos campos de pesquisa
function clearFilters() {
    document.getElementById('searchYear').value = '';
    document.getElementById('searchMonth').value = '';
    document.getElementById('searchDay').value = '';
    document.getElementById('searchType').value = '';
    document.getElementById('searchDescription').value = '';

    loadTasks();

    let btnErase = document.getElementById('btnErase');
    if (btnErase) {
        btnErase.style.display = 'none'; 
    }
}


// Código para filtrar status da tarefa
let filters = document.querySelectorAll('.filter-btn');
let listTask = document.getElementById('listTasks');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active-filter'));

        filter.classList.add('active-filter');

        let filterType = filter.id;

        let allTasks = listTask.querySelectorAll('tr'); 

        allTasks.forEach(task => {
            switch(filterType) {
                case 'filter-all':
                    task.style.display = ''; 
                    break;
                case 'filter-completed':
                    task.style.display = task.classList.contains('completed') ? '' : 'none';
                    break;
                case 'filter-not-completed':
                    task.style.display = task.classList.contains('completed') ? 'none' : ''; 
                    break;
            }
        });
    });
});
