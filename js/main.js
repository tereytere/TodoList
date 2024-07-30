const input = document.querySelector('form input');
const add = document.querySelector('.btn-add');
const ul = document.querySelector('.li-container ul');
const ulCompleted = document.querySelector('.li-container-completed ul');
const ulDeleted = document.querySelector('.li-container-deleted ul');
const empty = document.querySelector('.empty');

let taskIdCounter = 0;

class Task {
    constructor(id, text) {
        this.id = id;
        this.text = text;
    }
}

class Tasks {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
    editTask(id, newText) {
        console.log('Attempting to edit task with ID:', id);
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            console.log('Found task before edit:', task);
            task.text = newText;
            console.log('Updated task:', task);
        } else {
            console.log('Task not found:', id);
        }
    }

    deletedTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            this.tasks = this.tasks.filter(task => task.id !== id);
        }
        return task;
    }
}

const pendingTasks = new Tasks('Pending TODO List');
const doneTasks = new Tasks('Completed TODO List');
const deletedTasks = new Tasks('Deleted TODO List');

add.addEventListener('click', (event) => {
    event.preventDefault();
    if (input.value !== '') {
        const task = new Task(taskIdCounter++, input.value);
        pendingTasks.addTask(task);
        printTasks(pendingTasks, ul);
        empty.style.display = 'none';
        input.value = '';
    }
    console.log(pendingTasks);
});

function printTask(task, domElement) {
    const li = document.createElement('li');
    li.innerHTML = `${task.text} <button class="btn-done"><i class="fa-regular fa-square-check"></i></button> <button class="btn-edit"><i class="fa-solid fa-pen edit"></i></button> <button class="btn-delete"><i class="fa-solid fa-trash-can delete"></i></button>`;
    li.id = task.id;

    li.querySelector('.btn-edit').addEventListener('click', (event) => {
        event.preventDefault();
        const liElement = event.target.closest('li');
        handleEdit(parseInt(liElement.id));
    });

    li.querySelector('.btn-done').addEventListener('click', (event) => {
        event.preventDefault();
        const liElement = event.target.closest('li');
        handleDone(parseInt(liElement.id));
    });

    li.querySelector('.btn-delete').addEventListener('click', (event) => {
        event.preventDefault();
        const liElement = event.target.closest('li');
        handleDelete(parseInt(liElement.id));
    });

    domElement.appendChild(li);
}

function printTasks(list, domElement) {
    domElement.innerHTML = '';
    for (let task of list.tasks) {
        printTask(task, domElement);
    }
}

function handleEdit(id) {
    console.log('Editing task with ID:', id);
    const newText = prompt("Edit task:");
    if (newText !== null && newText.trim() !== '') {
        pendingTasks.editTask(id, newText.trim());
        printTasks(pendingTasks, ul);
    } else {
        console.log('No new text provided');
    }
}

function handleDelete(id) {
    alert('Are you sure you want to delete this task?')
    const task = pendingTasks.deletedTask(id);
    if (task) {
        deletedTasks.addTask(task);
    }
    printTasks(pendingTasks, ul);
    console.log(deletedTasks);
    printTasks(deletedTasks, ulDeleted);
}

function handleDone(id) {
    const task = pendingTasks.deletedTask(id);
    if (task) {
        doneTasks.addTask(task);
    }
    printTasks(pendingTasks, ul);
    console.log(doneTasks);
    printTasks(doneTasks, ulCompleted);
}
